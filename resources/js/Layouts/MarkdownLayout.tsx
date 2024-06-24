
/**
 * MarkdownLayout
 * @param children
 * @returns JSX 
 */
export default function MarkdownLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
        <div className="bg-slate-800 h-screen">
            {children}
        </div>
    );
}
  