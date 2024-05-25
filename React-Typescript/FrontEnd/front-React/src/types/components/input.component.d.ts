
declare namespace Input {
  interface Props {
    className?: string;
    errorMessage?: string;
    id?: string;
    label?: string;
    name?: string;
    onBlur?: ExternalModules.React.FocusEventHandler;
    onChange?: ExternalModules.React.ChangeEventHandler;
    onFocus?: ExternalModules.React.FocusEventHandler;
    placeholder?: string;
    showEditIndicator?: boolean;
    value?: string;
  }
}
