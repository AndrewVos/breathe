import { useState } from "react";
import classNames from "classnames";
import emotions from "./emotions.js";
import Head from "next/head";

const SimpleStep = ({ children, onMoveToNextStepRequest }) => {
  return (
    <PageContainer onClick={onMoveToNextStepRequest}>
      <div className="md:w-1/2 h-full flex flex-col">
        <div className="mb-10 text-blue-100 flex-auto flex justify-center items-center text-center">
          {children}
        </div>
        {onMoveToNextStepRequest && (
          <div className="text-xl font-bold text-blue-100 text-center">
            Press anywhere to continue
          </div>
        )}
      </div>
    </PageContainer>
  );
};

const ScrollingPageContainer = ({ children }) => {
  return (
    <button className="flex flex-col w-full p-3 bg-gray-600 items-center justify-center">
      {children}
    </button>
  );
};

const PageContainer = ({ onClick, children }) => {
  const classNames =
    "absolute flex w-full h-full p-3 bg-gray-600 items-center justify-center";
  if (onClick) {
    return (
      <button onClick={onClick} className={classNames}>
        {children}
      </button>
    );
  } else {
    return (
      <div onClick={onClick} className={classNames}>
        {children}
      </div>
    );
  }
};

const LabellingEmotions = ({ onMoveToNextStepRequest }) => {
  const [highlightedLabels, setHighlightedLabels] = useState([]);

  const Label = ({ text, highlightedLabels, setHighlightedLabels }) => {
    const isHighlighted = highlightedLabels.includes(text);

    const handleClick = () => {
      if (isHighlighted) {
        setHighlightedLabels(highlightedLabels.filter((l) => l !== text));
      } else {
        const newHighlightedLabels = highlightedLabels.concat(text);
        setHighlightedLabels(newHighlightedLabels);

        if (newHighlightedLabels.length === 3) {
          onMoveToNextStepRequest();
        }
      }
    };

    return (
      <div
        onClick={handleClick}
        className={classNames("text-xl font-bold rounded p-2", {
          "bg-gray-200": !isHighlighted,
          "text-gray-700": !isHighlighted,
          "bg-gray-500": isHighlighted,
          "text-white": isHighlighted,
        })}
      >
        {text}
      </div>
    );
  };

  return (
    <ScrollingPageContainer>
      <div className="text-4xl text-blue-200 p-3">
        Choose three emotions you are feeling right now
      </div>
      <div className="w-full">
        <div className="grid gap-2">
          {emotions.bad.map((badEmotions) => {
            {
              return badEmotions.map((emotion) => {
                return (
                  <Label
                    key={emotion}
                    text={emotion}
                    highlightedLabels={highlightedLabels}
                    setHighlightedLabels={setHighlightedLabels}
                  />
                );
              });
            }
          })}
        </div>
        <div className="grid gap-2">
          {emotions.good.map((goodEmotions) => {
            {
              return goodEmotions.map((emotion) => {
                return (
                  <Label
                    key={emotion}
                    text={emotion}
                    highlightedLabels={highlightedLabels}
                    setHighlightedLabels={setHighlightedLabels}
                  />
                );
              });
            }
          })}
        </div>
      </div>
    </ScrollingPageContainer>
  );
};

const BreatheStep = ({ onMoveToNextStepRequest }) => {
  return (
    <PageContainer onClick={onMoveToNextStepRequest}>
      <div className="flex flex-col w-full h-full">
        <div className="text-4xl text-blue-100 p-3">
          Breathing helps calm you
        </div>

        <div className="breathe flex-grow w-full flex flex-auto items-center justify-center">
          <div className="circle w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex justify-self-center items-center justify-center rounded-full text-4xl uppercase bg-blue-300 text-blue-800">
            Breathe
          </div>
        </div>

        <div className="text-xl font-bold text-blue-100">
          Press anywhere to continue
        </div>
      </div>
    </PageContainer>
  );
};

export default function Home() {
  const [stepIndex, setStepIndex] = useState(0);
  const onMoveToNextStepRequest = () => {
    if (stepIndex === steps.length - 1) {
      return;
    }
    setStepIndex(stepIndex + 1);
  };

  const steps = [
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div className="text-4xl">
        Welcome to <span className="text-blue-100">Breathe</span>, a tool
        designed to help bring you down from a high level of anxiety.
      </div>
    </SimpleStep>,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div className="text-4xl">Let's focus on our breathing for a bit</div>
    </SimpleStep>,
    <BreatheStep onMoveToNextStepRequest={onMoveToNextStepRequest} />,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div className="text-4xl">Well done!</div>
    </SimpleStep>,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div>
        <div className="mb-10 text-4xl">
          This exercise is called the
          <span className="text-blue-200"> 5 4 3 2 1 Grounding Technique</span>.
        </div>
        <div className="text-3xl">
          It should help to ground you in the present.
        </div>
      </div>
    </SimpleStep>,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div className="text-4xl">
        Name <span className="text-blue-200"> five </span> things you can see
        around you
      </div>
    </SimpleStep>,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div className="text-4xl">
        Focus on <span className="text-blue-200"> four </span> things you can
        feel
      </div>
    </SimpleStep>,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div className="text-4xl">
        Name <span className="text-blue-200"> three </span> things you can hear
      </div>
    </SimpleStep>,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div className="text-4xl">
        Notice <span className="text-blue-200"> two </span> things you can smell
      </div>
    </SimpleStep>,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div className="text-4xl">
        Focus on <span className="text-blue-200"> one </span> thing you can
        taste
      </div>
    </SimpleStep>,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div className="text-4xl">Well done!</div>
    </SimpleStep>,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div>
        <div className="mb-10 text-4xl">Labelling your emotions</div>
        <div className="text-3xl">
          This exercise should help create distance between you and the emotions
          you are currently feeling
        </div>
      </div>
    </SimpleStep>,
    <LabellingEmotions onMoveToNextStepRequest={onMoveToNextStepRequest} />,
    <SimpleStep onMoveToNextStepRequest={onMoveToNextStepRequest}>
      <div className="text-4xl">Well done!</div>
    </SimpleStep>,
    <SimpleStep>
      <div>
        <div className="mb-10 text-4xl">Well done, you made it to the end!</div>
        <div className="text-3xl text-center">
          This is just an experiment right now, but if it helped you or you have
          any ideas how to make it better{" "}
          <a
            href="mailto:andrew@andrewvos.com"
            className="underline text-blue-200"
          >
            please let me know.
          </a>
        </div>
      </div>
    </SimpleStep>,
  ];

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {steps[stepIndex]}
    </>
  );
}
