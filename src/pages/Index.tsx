import FloatingHearts from "@/components/FloatingHearts";
import ValentineCard from "@/components/ValentineCard";

const Index = () => {
  return (
    <div className="min-h-svh w-full flex items-center justify-center bg-gradient-to-br from-background via-secondary to-blush overflow-hidden relative p-4">
      <FloatingHearts />
      <ValentineCard />
    </div>
  );
};

export default Index;
