import { useEffect, useRef } from "react";
import "./custom-cursor.css";

const interactiveSelector = [
  "a",
  "button",
  '[role="button"]',
  ".project-card",
  ".project-thumbnail-frame",
  ".project-detail-image",
  ".skill-card",
  ".career-timeline-item",
  ".leadership-card",
  ".gallery-card",
  ".recognition-card",
].join(", ");

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = false;
    let frame = 0;
    let hasPosition = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function animate() {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        frame = window.requestAnimationFrame(animate);
      } else {
        currentX = targetX;
        currentY = targetY;
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        frame = 0;
      }
    }

    function handleMouseMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasPosition) {
        currentX = targetX;
        currentY = targetY;
        hasPosition = true;
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        cursor.classList.add("is-visible");
      }

      if (!frame) frame = window.requestAnimationFrame(animate);
    }

    function handlePointerOver(event) {
      if (!(event.target instanceof Element)) return;

      const target = event.target.closest(interactiveSelector);
      cursor.classList.toggle("is-interactive", Boolean(target));
      cursor.classList.toggle(
        "is-button",
        Boolean(target?.matches('button, [role="button"], .button')),
      );
      cursor.classList.toggle(
        "is-view",
        Boolean(
          target?.matches(".project-thumbnail-frame, .project-detail-image"),
        ),
      );
    }

    function resetCursor() {
      cursor.classList.remove(
        "is-visible",
        "is-interactive",
        "is-button",
        "is-view",
      );
      hasPosition = false;
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    function attachListeners() {
      if (active || !pointerQuery.matches || motionQuery.matches) return;
      active = true;
      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      document.addEventListener("mouseover", handlePointerOver, {
        passive: true,
      });
      document.addEventListener("mouseleave", resetCursor);
      window.addEventListener("blur", resetCursor);
    }

    function detachListeners() {
      if (!active) return;
      active = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handlePointerOver);
      document.removeEventListener("mouseleave", resetCursor);
      window.removeEventListener("blur", resetCursor);
      resetCursor();
    }

    function updateAvailability() {
      if (pointerQuery.matches && !motionQuery.matches) {
        attachListeners();
      } else {
        detachListeners();
      }
    }

    pointerQuery.addEventListener("change", updateAvailability);
    motionQuery.addEventListener("change", updateAvailability);
    updateAvailability();

    return () => {
      pointerQuery.removeEventListener("change", updateAvailability);
      motionQuery.removeEventListener("change", updateAvailability);
      detachListeners();
    };
  }, []);

  return (
    <span ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor-label">VIEW</span>
    </span>
  );
}