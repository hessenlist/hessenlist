"use client";

import React from "react";

type State = { hasError: boolean; err?: unknown };

export default class ClientErrorBoundary extends React.Component<
  { label?: string; children: React.ReactNode },
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: unknown) {
    return { hasError: true, err };
  }

  componentDidCatch(err: unknown) {
    // видимий лог у консолі, щоб одразу бачити stack
    // eslint-disable-next-line no-console
    console.error("[ClientErrorBoundary]", this.props.label ?? "", err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass rounded-2xl p-4 text-sm text-red-700">
          <div className="font-semibold">Client error in {this.props.label ?? "component"}</div>
          <div className="mt-1 opacity-80">
            Перевір консоль браузера для деталей (stack trace).
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
