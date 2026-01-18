"use client";

import gsap from "gsap";
import { ScrollTrigger, Flip } from "gsap/all";
import { useLayoutEffect } from "react";

export const GsapRegistrar = () => {
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.registerPlugin(Flip);
    }, []);

    return null;
};