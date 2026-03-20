"use client";

import { useId, type ReactNode } from "react";

interface LiveProgressBorderProps {
	/** Progress value between 0 and 1 */
	progress: number;
	/** Outer size in pixels (default: 68) */
	size?: number;
	/** Border width in pixels (default: 3) */
	borderWidth?: number;
	/** Corner radius of outer edge (default: 16) */
	cornerRadius?: number;
	/** Additional className for the container */
	className?: string;
	/** Content rendered inside the border (e.g. avatar) */
	children: ReactNode;
}

/**
 * A smooth rounded-rectangle progress border.
 *
 * Uses `<rect>` with `pathLength` + `stroke-dasharray` so corners
 * are natively anti-aliased by the browser — no jagged arc paths.
 *
 * Progress starts from bottom-center and fills clockwise.
 */
export function LiveProgressBorder({
	progress,
	size = 68,
	borderWidth = 3,
	cornerRadius = 16,
	className,
	children,
}: LiveProgressBorderProps) {
	const uid = useId();
	const gradId = `lpb-grad-${uid}`;
	const filterId = `lpb-glow-${uid}`;

	const clamped = Math.min(1, Math.max(0, progress));
	const viewBox = size;

	// Rect geometry (centered stroke)
	const half = borderWidth / 2;
	const rx = cornerRadius;
	const ry = cornerRadius;
	const rectX = half;
	const rectY = half;
	const rectW = viewBox - borderWidth;
	const rectH = viewBox - borderWidth;

	// Inner content inset (border + 2px gap)
	const inset = borderWidth + 2;
	const innerRadius = Math.max(0, cornerRadius - inset + half);

	// dash math — pathLength normalised to 100
	// <rect> starts at (x+rx, y) going clockwise.
	// Bottom-center is at ~56.9% of the perimeter from that start.
	// dashoffset = 100 - 56.9 ≈ 43 keeps the gap ending at bottom-center.
	const PATH_LENGTH = 100;
	const DASH_OFFSET = 43;

	const dashArray = `${clamped * PATH_LENGTH} ${(1 - clamped) * PATH_LENGTH}`;

	return (
		<div
			className={className}
			style={{
				position: "relative",
				width: size,
				height: size,
				flexShrink: 0,
			}}
		>
			{/* SVG progress ring */}
			<svg
				width={size}
				height={size}
				viewBox={`0 0 ${viewBox} ${viewBox}`}
				fill="none"
				style={{ position: "absolute", inset: 0, overflow: "visible" }}
				shapeRendering="geometricPrecision"
			>
				<defs>
					<linearGradient
						id={gradId}
						x1="2"
						y1="90"
						x2="72"
						y2="-4"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#7926D7" />
						<stop offset="0.495" stopColor="#9849F5" />
						<stop offset="1" stopColor="#CD61FF" />
					</linearGradient>

					<filter
						id={filterId}
						x="-30%"
						y="-30%"
						width="160%"
						height="160%"
					>
						<feDropShadow
							dx="0"
							dy="0"
							stdDeviation="4"
							floodColor="rgba(152,73,245,0.24)"
						/>
					</filter>
				</defs>

				{/* Track (unfilled ring) */}
				<rect
					x={rectX}
					y={rectY}
					width={rectW}
					height={rectH}
					rx={rx}
					ry={ry}
					fill="none"
					stroke="rgba(255,255,255,0.06)"
					strokeWidth={borderWidth}
					pathLength={PATH_LENGTH}
				/>

				{/* Progress fill */}
				<rect
					x={rectX}
					y={rectY}
					width={rectW}
					height={rectH}
					rx={rx}
					ry={ry}
					fill="none"
					stroke={`url(#${gradId})`}
					strokeWidth={borderWidth}
					pathLength={PATH_LENGTH}
					strokeDasharray={dashArray}
					strokeDashoffset={DASH_OFFSET}
					filter={`url(#${filterId})`}
					style={{ transition: "stroke-dashoffset 0.6s ease" }}
				/>
			</svg>

			{/* Inner content area */}
			<div
				style={{
					position: "absolute",
					top: inset,
					left: inset,
					right: inset,
					bottom: inset,
					borderRadius: innerRadius,
					overflow: "hidden",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{children}
			</div>
		</div>
	);
}
