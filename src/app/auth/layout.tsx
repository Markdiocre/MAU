export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex align-center justify-center">
            {children}
        </div>
    );
}