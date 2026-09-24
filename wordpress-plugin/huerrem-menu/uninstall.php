<?php
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}
delete_option( 'huerrem_menu_settings' );
delete_option( 'huerrem_menu_flush_rewrite' );
