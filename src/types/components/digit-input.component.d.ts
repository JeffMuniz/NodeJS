
declare namespace DigitInput {

  interface Props {
    className?: string;
    digits: number;
    onChange: ({
      event,
      value,
    }: {
      event: ExternalModules.React.ChangeEvent;
      value: string;
    }) => void;
  }

  interface State {
    values: Array<string>;
  }
}
