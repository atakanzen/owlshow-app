'use client';
import Button from '@/components/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks';
import { selectAppSettings } from '@/store/slices/appsettings';
import {
  selectCurrentPlayer,
  selectPlayers,
  setIsCurrent,
  setNotCurrent,
  setPlayers,
  setScore,
} from '@/store/slices/player';
import question, {
  selectQuestions,
  setAnswerSelected,
  setQuestionAnswered,
  setQuestionCurrent,
  setQuestionNotCurrent,
} from '@/store/slices/question';
import { Player } from '@/types/player';
import { Question } from '@/types/question';
import { generatePlayers } from '@/utils/data';
import classNames from 'classnames';
import Link from 'next/link';
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const ShowPage = () => {
  const {
    timeForSplashScreen,
    numberOfPlayers,
    pointsPerQuestion,
    timePerQuestion,
  } = useAppSelector(selectAppSettings);
  const players = useAppSelector(selectPlayers);

  const questions = useAppSelector(selectQuestions);

  const dispatch = useAppDispatch();
  const [splashScreen, setSplashScreen] =
    useState<boolean>(true);

  const [timeLeft, setTimeLeft] =
    useState<number>(timePerQuestion);

  const currentPlayer = useMemo(() => {
    return players.find((p) => p.isCurrent);
  }, [players]);
  const selectedQuestion = useMemo(() => {
    return questions.find((q) => q.isCurrent);
  }, [questions]);

  const selectedMultiAnswers = useMemo(() => {
    if (selectedQuestion === undefined) {
      return [];
    }

    return selectedQuestion.answers.filter(
      (a) => a.isSelected
    );
  }, [selectedQuestion]);

  const isAllQuestionsAnswered = useMemo(() => {
    return questions.every((q) => q.isAnswered);
  }, [questions]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplashScreen(false);
    }, timeForSplashScreen * 1000);
    dispatch(setPlayers(generatePlayers(numberOfPlayers)));
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, numberOfPlayers, timeForSplashScreen]);

  const interval = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    setTimeLeft(timePerQuestion);
    // Sleep for 1 second to allow read time.
    (async () =>
      await new Promise((r) => setTimeout(r, 1000)))();
    interval.current = setInterval(() => {
      // setTimeLeft
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, [selectedQuestion?.id, timePerQuestion]);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(interval.current);
    }
  }, [timeLeft, timePerQuestion]);

  const handleCorrectAnswer = (currPlayer: Player) => {
    dispatch(
      setScore({
        playerName: currPlayer.name,
        score: currPlayer.score + pointsPerQuestion,
      })
    );
    dispatch(setQuestionAnswered(selectedQuestion!.id));
    dispatch(setQuestionNotCurrent(selectedQuestion!.id));
    alert('Correct Answer!');
  };

  const handleWrongAnswer = (currPlayer: Player) => {
    dispatch(setNotCurrent(currPlayer.name));
    alert('Wrong Answer!');
  };

  const handleSingleAnswerClick = (isCorrect: boolean) => {
    if (currentPlayer === undefined) {
      alert('Select a player first.');
      return;
    }
    if (timeLeft === 0) {
      alert('Time ran out!');
      return;
    }
    if (isCorrect) {
      handleCorrectAnswer(currentPlayer);
    } else {
      handleWrongAnswer(currentPlayer);
    }
  };

  const handleMultiAnswerClick = () => {
    if (currentPlayer === undefined) {
      alert('Select a player first.');
      return;
    }

    if (timeLeft === 0) {
      alert('Time ran out!');
      return;
    }

    if (selectedMultiAnswers.length === 0) {
      alert('Select your answers first!');
      return;
    }

    const isAllCorrect =
      selectedMultiAnswers.every((a) => a.correct) &&
      selectedMultiAnswers.length ===
        selectedQuestion!.answers.filter((a) => a.correct)
          .length;

    if (isAllCorrect) {
      handleCorrectAnswer(currentPlayer);
    } else {
      handleWrongAnswer(currentPlayer);
      selectedMultiAnswers.forEach((a) => {
        dispatch(
          setAnswerSelected({
            questionId: selectedQuestion!.id,
            answerId: a.id,
          })
        );
      });
    }
  };

  return (
    <>
      {splashScreen ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <h2 className="animate-pulse text-4xl text-black">
            Loading Show
          </h2>
        </div>
      ) : (
        <div className="flex h-screen flex-col">
          <div className="flex h-5/6 items-center justify-center gap-x-3">
            <div className="flex h-5/6 w-1/3 flex-col items-center gap-y-4">
              <div className="flex h-1/2 w-full flex-col gap-y-4 overflow-y-auto rounded border border-black p-2">
                {players.map((player) => (
                  <div
                    key={player.name}
                    className={classNames(
                      'flex items-center justify-between rounded border border-black p-2 hover:cursor-pointer',
                      {
                        'bg-slate-300': player.isCurrent,
                      }
                    )}
                    onClick={() =>
                      dispatch(setIsCurrent(player.name))
                    }
                  >
                    <span className="font-semibold">
                      {player.name}
                    </span>
                    <span>Score: {player.score}</span>
                  </div>
                ))}
              </div>
              <div className="flex h-1/2 w-full flex-col gap-y-2 overflow-y-auto rounded border border-black p-2">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className={classNames(
                      'flex items-center justify-between rounded border border-black p-2 hover:cursor-pointer',
                      {
                        'bg-slate-300': question.isCurrent,
                      }
                    )}
                    onClick={() => {
                      if (!question.isAnswered) {
                        dispatch(
                          setQuestionCurrent({
                            questionId: question.id,
                          })
                        );
                      } else {
                        alert('Question answered already!');
                      }
                    }}
                  >
                    <span className="font-semibold">
                      {question.question}
                    </span>
                    <span>
                      {question.isAnswered
                        ? 'Answered'
                        : 'Not Answered'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-5/6 w-2/3 flex-col items-center rounded border border-black p-2">
              {selectedQuestion ? (
                <div className="flex flex-col items-center justify-center gap-y-4 py-4">
                  <div className="flex items-center justify-between gap-x-6">
                    <p className="text-3xl font-bold">
                      {selectedQuestion.question}
                    </p>
                    <span className="font-semibold text-red-500">
                      {timeLeft} seconds left
                    </span>
                  </div>
                  <span>{selectedQuestion.type}</span>
                  {selectedQuestion.answers.map(
                    (answer) => (
                      <div
                        key={answer.id}
                        className="flex w-full items-center justify-between rounded border border-black p-3 hover:cursor-pointer hover:bg-slate-300"
                        onClick={
                          selectedQuestion.type ===
                          'Single Answer Test'
                            ? () =>
                                handleSingleAnswerClick(
                                  answer.correct
                                )
                            : () =>
                                dispatch(
                                  setAnswerSelected({
                                    questionId:
                                      selectedQuestion.id,
                                    answerId: answer.id,
                                  })
                                )
                        }
                      >
                        {answer.answer}
                        {selectedQuestion.type ===
                          'Multi Answer Test' && (
                          <input
                            type="checkbox"
                            checked={answer.isSelected}
                            readOnly
                            disabled={timeLeft === 0}
                          />
                        )}
                      </div>
                    )
                  )}
                  {selectedQuestion.type ===
                    'Multi Answer Test' && (
                    <Button
                      className="self-end"
                      label="Confirm"
                      onClick={() =>
                        handleMultiAnswerClick()
                      }
                    />
                  )}
                </div>
              ) : isAllQuestionsAnswered ? (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-3xl font-bold">
                    All questions answered!
                  </p>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-3xl font-bold">
                    Select a question from the left side.
                  </p>
                </div>
              )}
            </div>
          </div>
          <Link
            className="self-start rounded bg-slate-800 p-4 text-white"
            href="/"
          >
            Go Back To Configuration
          </Link>
        </div>
      )}
    </>
  );
};

export default ShowPage;
