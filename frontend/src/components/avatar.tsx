export function Avatar({ src, size }: { src: string; size?: string }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: size ?? "100px",
                height: size ?? "100px",
                borderRadius: "50%",
                overflow: "hidden",
            }}
        >
            <img
                src={src}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </div>
    );
}
