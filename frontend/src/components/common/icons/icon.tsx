export function Icon({
    className,
    size,
}: {
    className?: string;
    size?: string;
    style?: React.CSSProperties;
}) {
    return (
        <i
            className={`fa-solid ${className}`}
            style={{
                fontSize: size ?? "16px",
            }}
        ></i>
    );
}
