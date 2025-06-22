'use client';

import { cn } from '@/lib/utils';
import { ArrowUpIcon, LoaderCircleIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ModelSelectionDropDown from '../chat-window/ModelSelection';

interface PixelData {
  x: number;
  y: number;
  color: number[];
}

interface NewData {
  x: number;
  y: number;
  r: number;
  color: string;
}

export function AskToLlmTextarea({
  placeholders,
  onChange,
  onSubmit,
  modelData,
  isLoading,
  selectedModel,
  onModelChange,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (value: string) => void;
  modelData: { name: string; description: string }[];
  isLoading?: boolean;
  selectedModel: { name: string; description: string } | null;
  onModelChange: (model: { name: string; description: string }) => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startAnimation = () => {
      intervalRef.current = setInterval(() => {
        setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);
      }, 3200);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible' && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else if (document.visibilityState === 'visible') {
        startAnimation();
      }
    };

    startAnimation();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [placeholders]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleFocus = () => {
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    };

    input.addEventListener('focus', handleFocus);

    return () => {
      input.removeEventListener('focus', handleFocus);
    };
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<NewData[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue('font-size'));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = '#FFF';
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: PixelData[] = [];

    for (let t = 0; t < 800; t++) {
      const i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        const e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach(t => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue('');
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();
    const value = inputRef.current?.value || '';
    if (value) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0,
      );
      animate(maxX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !animating) {
      e.preventDefault();
      (e.target as HTMLTextAreaElement).blur();
      const text = inputRef.current?.value || '';
      if (text) {
        onSubmit(text);
        vanishAndSubmit();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit(value);
  };

  return (
    <form
      className={cn(
        'relative mx-auto flex w-full max-w-sm flex-col gap-2 overflow-hidden rounded-2xl border-2 border-neutral-700/40 bg-white p-2 shadow-lg shadow-neutral-900 transition duration-200 focus:border-neutral-700 md:max-w-xl lg:max-w-4xl dark:bg-[#452A7C1A]/90',
        value && 'bg-gray-50',
      )}
      onSubmit={handleSubmit}
    >
      <textarea
        onChange={e => {
          if (!animating) {
            setValue(e.target.value);
            onChange(e);
          }
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        rows={3}
        className={cn(
          'relative z-50 my-2 field-sizing-content min-h-12 w-full resize-none bg-transparent px-2 text-black focus:ring-0 focus:outline-none sm:text-base dark:text-white',
          animating && 'text-transparent dark:text-transparent',
          'max-h-60 overflow-y-auto',
        )}
        placeholder={undefined}
      />

      <div className="pointer-events-none absolute inset-0 flex items-start pt-4 pl-4 sm:pl-5">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{ y: 5, opacity: 0 }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'linear' }}
              className="truncate font-normal text-neutral-500 select-none sm:text-base dark:text-zinc-500"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="flex w-full items-end justify-between">
        <ModelSelectionDropDown
          modelData={modelData}
          isLoading={isLoading}
          selectedModel={selectedModel}
          onModelChange={onModelChange}
        />
        <button
          disabled={!value}
          type="submit"
          className="bg-primary group dark:bg-primary hover:dark:bg-primary/80 flex h-10 w-10 cursor-pointer items-center justify-center overflow-visible rounded-lg transition duration-300 disabled:cursor-not-allowed disabled:bg-neutral-300 dark:disabled:bg-neutral-700"
        >
          {isLoading ? (
            <LoaderCircleIcon
              strokeWidth={2.5}
              size={22}
              className="animate-spin text-neutral-700 group-disabled:text-neutral-500"
            />
          ) : (
            <ArrowUpIcon
              strokeWidth={2.7}
              size={22}
              className="text-neutral-700 group-disabled:text-neutral-500"
            />
          )}
        </button>
      </div>
    </form>
  );
}
