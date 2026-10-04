import { Link } from "react-router-dom";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-display text-7xl font-bold text-accent">404</p>
      <p className="mt-3 text-lg font-semibold">Yeh page nahi mila — page not found.</p>
      <Button as={Link} to="/" className="mt-6">Back to Home</Button>
    </Container>
  );
}
