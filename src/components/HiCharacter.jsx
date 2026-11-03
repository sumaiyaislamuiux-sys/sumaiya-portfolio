export default function HiCharacter({
  visible,
  characterRef,
}) {
  return (
    <span
      ref={characterRef}
      className={`hi-character${visible ? " is-visible" : ""}`}
      aria-hidden="true"
    >
      <span className="hi-character-art">
        <img src="/navy-blue-girl.jpg" alt="" draggable="false" />
        <svg
          className="hi-character-wave"
          viewBox="0 0 1536 1024"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="hi-character-hand-clip">
              <path d="M342 633 C332 619 343 594 363 582 C354 566 371 547 391 550 C398 534 419 544 432 562 C445 543 465 556 477 579 C492 575 507 590 513 609 L546 615 C565 622 570 649 557 677 L536 715 C529 728 517 739 501 741 L430 739 C408 726 386 705 365 684 C349 668 335 650 342 633Z" />
            </clipPath>
          </defs>
          <path
            className="hi-character-hand-matte"
            d="M327 632 C321 609 341 584 355 576 C347 556 369 537 388 541 C398 524 423 536 433 552 C447 535 472 548 481 570 C499 568 519 585 523 602 L550 607 C575 618 580 650 565 682 L543 723 C535 739 518 749 499 750 L423 748 C398 734 378 711 355 690 C336 672 321 650 327 632Z"
          />
          <g className="hi-character-hand">
            <image
              href="/navy-blue-girl.jpg"
              width="1536"
              height="1024"
              preserveAspectRatio="none"
              clipPath="url(#hi-character-hand-clip)"
            />
          </g>
        </svg>
      </span>
    </span>
  );
}