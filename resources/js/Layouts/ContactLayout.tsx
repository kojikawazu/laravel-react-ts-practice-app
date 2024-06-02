export default function ContactLayout({ 
    children 
  }: { 
    children: React.ReactNode 
  }) {
    console.log("ContactLayout mounted");
    
    return (
      <div>ContactLayout
        {children}
      </div>
    );
}
  