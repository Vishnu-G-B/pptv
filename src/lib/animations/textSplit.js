import SplitType from 'split-type';
import {gsap} from "gsap/dist/gsap";

let ScrollTrigger;
if (typeof window !== 'undefined') {
    ScrollTrigger = (await import('gsap/dist/ScrollTrigger.js')).default;
    gsap.registerPlugin(ScrollTrigger);
}

export function createTextAnimation(element) {
    if (typeof window === 'undefined') return null;

    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-block';
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);

    const splitText = new SplitType(element, {
        types: 'chars, words',
        tagName: 'span',
        charClass: 'char',
        wordClass: 'word',
        splitClass: 'split-text',
    });

    splitText.words.forEach((word, index) => {
        if (index < splitText.words.length - 1) {
            const space = document.createElement('span');
            space.innerHTML = '';
            space.className = 'split-space';
            // space.classList.add('inline-block');
            word.after(space);
        }
    });

    gsap.set(splitText.chars, {
        willChange: 'transform',
        transformOrigin: '50% 0%',
        scaleY: 0,
        opacity: 0
    });

    return {
        play: () => {
            return gsap.to(splitText.chars, {
                ease: 'expo.out',
                opacity: 1,
                scaleY: 1,
                yPercent: 0,
                stagger: 0.02,
                duration: 0.6,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    once: true,
                }
            });
        },
        revert: () => {
            if (wrapper.parentNode) {
                wrapper.parentNode.insertBefore(element, wrapper);
                wrapper.remove();
            }
            ;
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === element) {
                    st.kill();
                }
            });
            splitText.revert();
        }
    };
}

const styles = `
    .split-text {
        display: inline-block;
    }
    .word {
        display: inline-block;
        white-space: pre;
    }
    .char {
        display: inline-block;
        white-space: pre;
    }
    .split-space {
        white-space: pre;
        display: inline;
    }
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}


export function textAnimation(node) {
    let animation;

    function init() {
        if (animation) {
            animation.revert();
        }
        animation = createTextAnimation(node);
        requestAnimationFrame(() => {
            animation.play();
        });
    }

    init();

    return {
        update() {
            init();
        },
        destroy() {
            if (animation) {
                animation.revert();
            }
        }
    };
}