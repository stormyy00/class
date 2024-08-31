import Protected from "@/components/Protected";
import Body from "@/components/Body";

export default async function HomePage() {
  return (
    <div>
      <Protected>
        <Body />
      </Protected>
    </div>
  );
}
