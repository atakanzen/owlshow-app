'use client';
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks';
import { selectAppSettings } from '@/store/slices/appsettings';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ShowPage = () => {
  const { timeForSplashScreen } = useAppSelector(
    selectAppSettings
  );
  const dispatch = useAppDispatch();
  const [splashScreen, setSplashScreen] =
    useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplashScreen(false);
    }, timeForSplashScreen * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [timeForSplashScreen]);

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
              <div className="flex h-1/2 w-full rounded border border-black p-2">
                Players
              </div>
              <div className="flex h-1/2 w-full rounded border border-black p-2">
                Select Questions
              </div>
            </div>
            <div className="flex h-5/6 w-2/3 flex-col items-center rounded border border-black p-2">
              Question Section
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
