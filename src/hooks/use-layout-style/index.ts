import type { CSSProperties } from "react";
import { useDebounceFn } from "ahooks";

import { useEffect, useMemo, useRef, useState } from "react";
import { CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT, CSS_VARIABLE_LAYOUT_CONTENT_WIDTH } from "@/layout/constants";
import { useCssVar } from "../use-css-var";
import { getElementVisibleRect, type VisibleDomRect } from "@/utils/dom";

/**
 * @zh 获取布局内容区域的样式
 * @en Get the style of the layout content area
 */
export function useLayoutContentStyle() {
	const contentElement = useRef<HTMLDivElement>(null);
	const [visibleDomRect, setVisibleDomRect] = useState<VisibleDomRect | null>(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);

	const contentHeightControls = useCssVar(CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT);
	const contentWidthControls = useCssVar(CSS_VARIABLE_LAYOUT_CONTENT_WIDTH);

	console.log(visibleDomRect, 'visibleDomRect');

	const overlayStyle = useMemo<CSSProperties>(() => {
		const { height, left, top, width } = visibleDomRect || {};
		return {
			height: `${height}px`,
			left: `${left}px`,
			position: "fixed",
			top: `${top}px`,
			width: `${width}px`,
			zIndex: 150,
		};
	}, [visibleDomRect]);

	const debouncedCalcHeight = useDebounceFn(
		() => {
			const rect = getElementVisibleRect(contentElement.current);
			setVisibleDomRect(rect);
			if (rect) {
				contentHeightControls.set(`${rect.height}px`);
				contentWidthControls.set(`${rect.width}px`);
			}
		},
		{ wait: 16 },
	);

	useEffect(() => {
		if (contentElement.current && !resizeObserverRef.current) {
			const resizeObserver = new ResizeObserver(debouncedCalcHeight.run);
			resizeObserverRef.current = resizeObserver;
			resizeObserver.observe(contentElement.current);
		}

		return () => {
			resizeObserverRef.current?.disconnect();
			resizeObserverRef.current = null;
		};
	}, [debouncedCalcHeight]);

	return { contentElement, overlayStyle, visibleDomRect };
}


