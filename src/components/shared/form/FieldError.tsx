interface FieldErrorProps {
    message?: string;
}

const FieldError = ({ message }: FieldErrorProps) =>
    message ? <p className="text-red-400 text-sm mt-1">{message}</p> : null;

export default FieldError;