import { Component, Suspense, lazy } from "react";

const Hero3D = lazy(() => import("./Hero3D"));

class Boundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch { return false; }
};

export function Hero3DLazy({ className }) {
  if (typeof window === "undefined" || !hasWebGL()) return null;
  return (
    <Boundary>
      <Suspense fallback={null}><Hero3D className={className} /></Suspense>
    </Boundary>
  );
}
