<?php
/**
 * Plugin Name:       Hürrem Speisekarte
 * Description:       Zeigt die digitale Speisekarte unter einer eigenen Adresse (z. B. /speisekarte) und bindet die Menü-Verwaltung ins WordPress-Dashboard ein.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Text Domain:       huerrem-menu
 * License:           GPL-2.0-or-later
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const HUERREM_MENU_OPTION     = 'huerrem_menu_settings';
const HUERREM_MENU_QUERY_VAR  = 'huerrem_menu';
const HUERREM_MENU_FLUSH_FLAG = 'huerrem_menu_flush_rewrite';

/** Settings with defaults. The menu app itself runs on Firebase Hosting. */
function huerrem_menu_settings() {
	return wp_parse_args(
		(array) get_option( HUERREM_MENU_OPTION, array() ),
		array(
			'app_url' => 'https://huerrem-menu-app-1.web.app',
			'slug'    => 'speisekarte',
		)
	);
}

function huerrem_menu_app_url( $path = '' ) {
	return untrailingslashit( huerrem_menu_settings()['app_url'] ) . $path;
}

function huerrem_menu_public_url() {
	// Without pretty permalinks the rewrite rule is inactive; fall back to the query var.
	if ( ! get_option( 'permalink_structure' ) ) {
		return add_query_arg( HUERREM_MENU_QUERY_VAR, '1', home_url( '/' ) );
	}
	return home_url( '/' . huerrem_menu_settings()['slug'] . '/' );
}

/* ---------------------------------------------------------------------------
 * Public page: /speisekarte renders the menu full-screen (no theme chrome).
 * ------------------------------------------------------------------------ */

function huerrem_menu_add_rewrite() {
	$slug = preg_quote( huerrem_menu_settings()['slug'], '#' );
	add_rewrite_rule( '^' . $slug . '/?$', 'index.php?' . HUERREM_MENU_QUERY_VAR . '=1', 'top' );

	if ( get_option( HUERREM_MENU_FLUSH_FLAG ) ) {
		delete_option( HUERREM_MENU_FLUSH_FLAG );
		flush_rewrite_rules( false );
	}
}
add_action( 'init', 'huerrem_menu_add_rewrite' );

add_filter(
	'query_vars',
	function ( $vars ) {
		$vars[] = HUERREM_MENU_QUERY_VAR;
		return $vars;
	}
);

/** Permissions the menu app uses (device orientation effects, AR viewer). */
function huerrem_menu_iframe_allow() {
	return 'fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking; camera; clipboard-write';
}

add_action(
	'template_redirect',
	function () {
		if ( ! get_query_var( HUERREM_MENU_QUERY_VAR ) ) {
			return;
		}
		status_header( 200 );
		nocache_headers();
		?>
<!doctype html>
<html lang="de">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<meta name="theme-color" content="#0a0a0a">
	<title><?php echo esc_html( 'Speisekarte – ' . get_bloginfo( 'name' ) ); ?></title>
	<?php wp_site_icon(); ?>
	<style>
		html, body { margin: 0; height: 100%; background: #0a0a0a; }
		iframe { position: fixed; inset: 0; width: 100%; height: 100%; border: 0; }
	</style>
</head>
<body>
	<iframe src="<?php echo esc_url( huerrem_menu_app_url( '/' ) ); ?>" title="Speisekarte" allow="<?php echo esc_attr( huerrem_menu_iframe_allow() ); ?>" allowfullscreen></iframe>
</body>
</html>
		<?php
		exit;
	}
);

/* ---------------------------------------------------------------------------
 * Shortcode [huerrem_menu height="85vh"] to embed the menu inside any page.
 * ------------------------------------------------------------------------ */

add_shortcode(
	'huerrem_menu',
	function ( $atts ) {
		$atts   = shortcode_atts( array( 'height' => '85vh' ), $atts, 'huerrem_menu' );
		$height = preg_match( '/^\d+(\.\d+)?(px|vh|%)$/', $atts['height'] ) ? $atts['height'] : '85vh';
		return sprintf(
			'<iframe src="%s" title="Speisekarte" allow="%s" allowfullscreen loading="lazy" style="width:100%%;height:%s;border:0;border-radius:12px;background:#0a0a0a"></iframe>',
			esc_url( huerrem_menu_app_url( '/' ) ),
			esc_attr( huerrem_menu_iframe_allow() ),
			esc_attr( $height )
		);
	}
);

/* ---------------------------------------------------------------------------
 * Dashboard: "Speisekarte" menu with the management panel + settings.
 * ------------------------------------------------------------------------ */

add_action(
	'admin_menu',
	function () {
		add_menu_page( 'Speisekarte', 'Speisekarte', 'edit_pages', 'huerrem-menu', 'huerrem_menu_render_manager', 'dashicons-food', 25 );
		add_submenu_page( 'huerrem-menu', 'Speisekarte bearbeiten', 'Bearbeiten', 'edit_pages', 'huerrem-menu', 'huerrem_menu_render_manager' );
		add_submenu_page( 'huerrem-menu', 'Speisekarte – Einstellungen', 'Einstellungen', 'manage_options', 'huerrem-menu-settings', 'huerrem_menu_render_settings' );
	}
);

function huerrem_menu_render_manager() {
	$admin_url = huerrem_menu_app_url( '/admin' );
	?>
	<div class="wrap">
		<h1 class="wp-heading-inline">Speisekarte bearbeiten</h1>
		<a href="<?php echo esc_url( huerrem_menu_public_url() ); ?>" class="page-title-action" target="_blank" rel="noopener">Speisekarte ansehen</a>
		<a href="<?php echo esc_url( $admin_url ); ?>" class="page-title-action" target="_blank" rel="noopener">In neuem Tab öffnen</a>
		<p class="description">Änderungen sind sofort auf der Speisekarte sichtbar. Falls die Anmeldung hier nicht angezeigt wird, bitte „In neuem Tab öffnen“ verwenden.</p>
		<iframe src="<?php echo esc_url( $admin_url ); ?>" title="Menü-Verwaltung" style="width:100%;height:calc(100vh - 190px);min-height:600px;border:1px solid #c3c4c7;border-radius:8px;background:#0a0a0a;margin-top:12px"></iframe>
	</div>
	<?php
}

add_action(
	'admin_init',
	function () {
		register_setting(
			'huerrem_menu',
			HUERREM_MENU_OPTION,
			array(
				'type'              => 'array',
				'sanitize_callback' => 'huerrem_menu_sanitize_settings',
			)
		);
	}
);

function huerrem_menu_sanitize_settings( $input ) {
	$current = huerrem_menu_settings();
	$app_url = isset( $input['app_url'] ) ? esc_url_raw( trim( $input['app_url'] ), array( 'https' ) ) : '';
	$slug    = isset( $input['slug'] ) ? sanitize_title( $input['slug'] ) : '';

	$clean = array(
		'app_url' => $app_url ? untrailingslashit( $app_url ) : $current['app_url'],
		'slug'    => $slug ? $slug : $current['slug'],
	);
	if ( $clean['slug'] !== $current['slug'] ) {
		update_option( HUERREM_MENU_FLUSH_FLAG, 1 );
	}
	return $clean;
}

function huerrem_menu_render_settings() {
	$s = huerrem_menu_settings();
	?>
	<div class="wrap">
		<h1>Speisekarte – Einstellungen</h1>
		<form method="post" action="options.php">
			<?php settings_fields( 'huerrem_menu' ); ?>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="huerrem-slug">Adresse der Speisekarte</label></th>
					<td>
						<code><?php echo esc_html( home_url( '/' ) ); ?></code>
						<input id="huerrem-slug" name="<?php echo esc_attr( HUERREM_MENU_OPTION ); ?>[slug]" type="text" value="<?php echo esc_attr( $s['slug'] ); ?>" class="regular-text" style="width:14em">
						<p class="description">Diese Adresse für die QR-Codes auf den Tischen verwenden: <a href="<?php echo esc_url( huerrem_menu_public_url() ); ?>" target="_blank" rel="noopener"><?php echo esc_html( huerrem_menu_public_url() ); ?></a></p>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="huerrem-app-url">App-URL</label></th>
					<td>
						<input id="huerrem-app-url" name="<?php echo esc_attr( HUERREM_MENU_OPTION ); ?>[app_url]" type="url" value="<?php echo esc_attr( $s['app_url'] ); ?>" class="regular-text">
						<p class="description">Adresse der Menü-App (Firebase Hosting). Nur ändern, wenn die App umzieht.</p>
					</td>
				</tr>
			</table>
			<?php submit_button(); ?>
		</form>
		<h2>Einbinden in eine Seite</h2>
		<p>Alternativ die Speisekarte mit dem Shortcode <code>[huerrem_menu]</code> in eine beliebige Seite einfügen (optional: <code>[huerrem_menu height="900px"]</code>).</p>
	</div>
	<?php
}

/* ---------------------------------------------------------------------------
 * Activation / deactivation: register or remove the /speisekarte route.
 * ------------------------------------------------------------------------ */

register_activation_hook(
	__FILE__,
	function () {
		huerrem_menu_add_rewrite();
		flush_rewrite_rules( false );
	}
);

register_deactivation_hook(
	__FILE__,
	function () {
		flush_rewrite_rules( false );
	}
);
