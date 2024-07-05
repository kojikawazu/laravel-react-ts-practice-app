/**
 * お問い合わせレイアウト
 * @param children 
 * @returns JSX
 */
export default function ContactLayout({ 
    children 
  }: { 
    children: React.ReactNode 
  }) {
    return (
      <div className="bg-amber-100 m-0 p-0 font-serif">
        {children}
      </div>
    );
}
  