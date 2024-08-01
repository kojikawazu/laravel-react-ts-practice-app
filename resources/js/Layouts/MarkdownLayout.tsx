/**
 * MarkdownLayout
 * @param children
 * @returns JSX
 */
export default function MarkdownLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-amber-100 py-12 font-serif">
            {children}
        </div>
    );
}
