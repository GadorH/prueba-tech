import ScrollMagic from "scrollmagic";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import "./styles/main.css";

const SPEED = 250;
const VIDEO_START_TIME = 3.5;
const video = document.getElementById("background-video");
const controller = new ScrollMagic.Controller();
gsap.registerPlugin(ScrollToPlugin);

let videoSource;
if (window.innerWidth <= 1080) {
    videoSource = "/video/ss22-joinlife-earth-hour.video-1080x1920.mp4";
} else {
    videoSource = "/video/ss22-joinlife-earth-hour.video-1920x1080.mp4";
}
video.innerHTML = `<source src="${videoSource}" type="video/mp4">`;
video.load();

const createScene = ({ triggerElement, duration, onProgress, controller }) => {
    const scene = new ScrollMagic.Scene({
        triggerElement: triggerElement,
        triggerHook: 0,
        duration: duration,
        offset: 0,
    })
        .on("progress", onProgress)
        .addTo(controller);

    return scene;
};

video.addEventListener("loadedmetadata", () => {
    const scrollHeight = video.duration * SPEED;
    document.body.style.minHeight = scrollHeight + "px";

    video.play();
    video.pause();

    const navigationArrow = document.querySelector(".navigation-arrow");
    createScene({
        triggerElement: null,
        duration: scrollHeight,
        onProgress: (e) => {
            video.currentTime = e.progress * video.duration;

            if (e.progress >= 0.7) {
                navigationArrow.classList.add("navigation-arrow-up");
                navigationArrow.classList.remove("navigation-arrow-down");

                navigationArrow.onclick = () => {
                    gsap.to(window, {
                        scrollTo: VIDEO_START_TIME * SPEED,
                        duration: 0.5,
                    });
                };
            } else if (e.progress <= 0.7 && e.scrollDirection === "REVERSE") {
                navigationArrow.classList.remove("navigation-arrow-up");
                navigationArrow.classList.add("navigation-arrow-down");

                navigationArrow.onclick = () => {
                    gsap.to(window, { scrollTo: scrollHeight, duration: 0.5 });
                };
            }
        },
        controller,
    });

    const triggerPosition1 = SPEED * VIDEO_START_TIME;
    document.getElementById("trigger1").style.top = triggerPosition1 + "px";
    const scene1 = createScene({
        triggerElement: "#trigger1",
        duration: "100%",
        onProgress: (e) => {
            let opacity;
            let topPosition;
            const reveal1 = document.querySelector("#reveal1");

            if (e.scrollDirection === "FORWARD") {
                if (e.progress > 0.5) {
                    opacity = 1 - (e.progress - 0.5) * 2;
                    topPosition = 35 - (e.progress - 0.5) * 45;
                }
            } else {
                if (e.progress > 0.5) {
                    opacity = 1 - (e.progress - 0.5) * 2;
                    topPosition = 35 + (0.5 - e.progress) * 45;
                }
            }

            reveal1.style.opacity = opacity;
            reveal1.style.top = `${topPosition}%`;
        },
        controller,
    });

    const trigger1EndPosition = triggerPosition1 + scene1.duration();
    document.getElementById("trigger2").style.top = trigger1EndPosition + 50 + "px";
    const scene2 = createScene({
        triggerElement: "#trigger2",
        duration: "100%",
        addIndicators: true,
        onProgress: (e) => {
            let opacity;
            let topPosition;
            const reveal2 = document.querySelector("#reveal2");

            if (e.scrollDirection === "FORWARD") {
                if (e.progress <= 0.33) {
                    opacity = e.progress * 3;
                    topPosition = 60 - e.progress * 60;
                } else if (e.progress > 0.66) {
                    opacity = 1 - (e.progress - 0.66) * 3;
                    topPosition = 40 - (e.progress - 0.66) * 60;
                } else {
                    opacity = 1;
                    topPosition = 40;
                }
            } else {
                if (e.progress >= 0.66) {
                    opacity = 1 - (e.progress - 0.66) * 3;
                    topPosition = 20 + (1 - e.progress) * 60;
                } else if (e.progress <= 0.33) {
                    opacity = e.progress * 3;
                    topPosition = 40 + (0.33 - e.progress) * 60;
                } else {
                    opacity = 1;
                    topPosition = 40;
                }
            }

            reveal2.style.opacity = opacity;
            reveal2.style.top = `${topPosition}%`;
        },
        controller,
    });

    const trigger2EndPosition = trigger1EndPosition + scene2.duration();
    document.getElementById("trigger3").style.top = trigger2EndPosition + 100 + "px";
    const scene3 = createScene({
        triggerElement: "#trigger3",
        duration: (scrollHeight - trigger2EndPosition) / 2,
        onProgress: (e) => {
            let opacity;
            let topPosition;
            const reveal3 = document.querySelector("#reveal3");

            if (e.scrollDirection === "FORWARD") {
                if (e.progress <= 0.5) {
                    opacity = e.progress * 2;
                    topPosition = 60 - e.progress * 50;
                }
            } else {
                if (e.progress < 0.5) {
                    opacity = 1 - (0.5 - e.progress) * 2;
                    topPosition = 35 + (0.5 - e.progress) * 50;
                }
            }

            reveal3.style.opacity = opacity;
            reveal3.style.top = `${topPosition}%`;
        },
        controller,
    });

    gsap.to(window, { scrollTo: VIDEO_START_TIME * SPEED, duration: 1.5 });
});
