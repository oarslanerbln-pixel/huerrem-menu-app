interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

export default function Switch({ checked, onChange, label }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      title={label}
      className="adm-switch"
      onClick={e => { e.stopPropagation(); onChange(!checked); }}
    />
  );
}
