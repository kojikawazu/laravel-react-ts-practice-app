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
    console.log("ContactLayout mounted");
    
    return (
      <div className="bg-amber-100 m-0 p-0">
        {children}
      </div>
    );
}
  