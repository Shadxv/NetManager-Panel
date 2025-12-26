'use client'



import {BubbleSwitch} from "@/components/BubbleSwitchComponent";
import {useState} from "react";

export const HomeNavBar = () => {
    const [active, setActive] = useState(false)

    return (
        <>
            <div className="fixed z-10 w-full flex items-center justify-end p-3">
                <button className="group flex items-center justify-center rounded-md hover:bg-muted-white/5 p-1" onClick={() => {setActive(true)}}>
                    <svg
                        viewBox="0 0 53 31"
                        className="size-10 text-secondary-gray/50 group-hover:text-secondary-gray/70 transition-colors"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g transform="scale(1,-1) translate(0,-30.80859375)">
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                d="M 6.015625,25.30859375 L 46.943359375,25.30859375 C 47.22265625,25.30859375 47.458984375,25.544921875 47.458984375,25.845703125 C 47.458984375,26.125 47.22265625,26.3828125 46.943359375,26.3828125 L 6.015625,26.3828125 C 5.71484375,26.3828125 5.478515625,26.125 5.478515625,25.845703125 C 5.478515625,25.544921875 5.71484375,25.30859375 6.015625,25.30859375 Z M 6.015625,14.8671875 L 46.943359375,14.8671875 C 47.22265625,14.8671875 47.458984375,15.103515625 47.458984375,15.404296875 C 47.458984375,15.68359375 47.22265625,15.94140625 46.943359375,15.94140625 L 6.015625,15.94140625 C 5.71484375,15.94140625 5.478515625,15.68359375 5.478515625,15.404296875 C 5.478515625,15.103515625 5.71484375,14.8671875 6.015625,14.8671875 Z M 6.015625,4.42578125 L 46.943359375,4.42578125 C 47.22265625,4.42578125 47.458984375,4.68359375 47.458984375,4.962890625 C 47.458984375,5.263671875 47.22265625,5.5 46.943359375,5.5 L 6.015625,5.5 C 5.71484375,5.5 5.478515625,5.263671875 5.478515625,4.962890625 C 5.478515625,4.68359375 5.71484375,4.42578125 6.015625,4.42578125 Z"
                            />
                        </g>
                    </svg>
                </button>
            </div>
            <div className={`${active ? "" : "hidden"} fixed z-20 w-full bg-primary-black py-3 rounded-b-xl shadow-xl shadow-primary-black/50`}>
                <div className="flex flex-col gap-4 p-3 pt-0 text-secondary-white text-lg">
                    <div className="self-end">
                        <button className=" group rounded-md hover:bg-muted-white/5 p-1" onClick={() => {setActive(false)}}>
                            <svg
                                viewBox="0 0 43.18 33.75"
                                className="size-10 text-secondary-gray/50 group-hover:text-secondary-gray/70 transition-colors"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g transform="scale(1,-1) translate(0,-33.751953125)">
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"

                                        d="M 5.62890625,1.654296875
                   C 5.435546875,1.439453125 5.435546875,1.138671875 5.62890625,0.923828125
                   C 5.84375,0.708984375 6.166015625,0.708984375 6.359375,0.923828125
                   L 21.591796875,16.15625
                   L 36.802734375,0.923828125
                   C 37.017578125,0.708984375 37.318359375,0.708984375 37.533203125,0.923828125
                   C 37.748046875,1.138671875 37.748046875,1.439453125 37.533203125,1.654296875
                   L 22.322265625,16.88671875
                   L 37.533203125,32.09765625
                   C 37.748046875,32.3125 37.748046875,32.61328125 37.533203125,32.828125
                   C 37.318359375,33.04296875 37.017578125,33.04296875 36.802734375,32.828125
                   L 21.591796875,17.6171875
                   L 6.359375,32.828125
                   C 6.166015625,33.04296875 5.84375,33.04296875 5.62890625,32.828125
                   C 5.435546875,32.61328125 5.435546875,32.3125 5.62890625,32.09765625
                   L 20.861328125,16.88671875
                   Z"
                                    />
                                </g>
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 items-center">
                        <p>Language</p>
                        <BubbleSwitch leftOption="EN" rightOption="PL"/>
                        <p>Theme</p>
                        <BubbleSwitch leftOption="Dark" rightOption="Light"/>
                    </div>
                    <button >

                    </button>
                </div>
            </div>
        </>
    )
}