import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import FileUploader from '../ui/FileUploader';
import { Button } from '../ui/button';
import { CornerDownRightIcon, GlobeIcon } from 'lucide-react';

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

interface AnimatedFileTextareaProps {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (value: string) => void;
  isLoading?: boolean;
}

const AnimatedFileTextarea = ({
  placeholders,
  onChange,
  onSubmit,
  isLoading,
}: AnimatedFileTextareaProps) => {
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

  // Vanish and submit
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

  // Handle textarea keydown
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit(value);
  };

  // Focus the textarea when not loading
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  return (
    <form
      className={cn(
        'shadow-lgtransition relative mx-auto flex w-full flex-col gap-5 overflow-hidden rounded-[28px] border border-[#404040]/40 bg-[#000000]/40 p-3 duration-200 focus:border-neutral-700',
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
          'font-briColage relative z-50 field-sizing-content min-h-12 w-full resize-none truncate bg-transparent px-2 py-1 text-sm leading-7 font-medium whitespace-pre-wrap text-white select-none focus:ring-0 focus:outline-none sm:text-base lg:text-base',
          animating && 'text-transparent dark:text-transparent',
          'max-h-60 overflow-y-auto',
        )}
        placeholder={undefined}
      />
      <div className="pointer-events-none absolute inset-0 flex items-start pt-4 pl-5">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{ y: 5, opacity: 0 }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'linear' }}
              className="font-briColage truncate text-sm leading-7 font-medium text-[#71717B] select-none lg:text-base"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="flex w-full items-end justify-between">
        <div className="flex items-center gap-2 lg:gap-3">
          <FileUploader
            onFileSelected={(file: File) => {
              console.log(file);
            }}
          />
          <SearchEnebledButton />
        </div>
        <SubmitButton type="submit" disabled={!value || animating} />
      </div>
    </form>
  );
};

export default AnimatedFileTextarea;

export const SearchEnebledButton = () => {
  return (
    <Button className="flex h-9 w-auto gap-2 rounded-full bg-[#404040]/40 text-[#BAC0CC] hover:bg-[#2B2B2B]/60 lg:h-10 lg:p-[9px]">
      <GlobeIcon
        size={20}
        strokeWidth={1.8}
        className="h-4 w-4 lg:h-5 lg:w-5"
      />
      <p className="font-briColage text-xs leading-5 font-semibold lg:text-sm">
        search enabled
      </p>
    </Button>
  );
};

export const SubmitButton = ({
  disabled,
  ...props
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      disabled={disabled}
      {...props}
      className={`flex h-9 w-20 cursor-pointer gap-1 rounded-full bg-gradient-to-br from-[#3DDBB0] to-[#89E06C] py-3 text-[#161616] lg:h-10 lg:w-24 ${disabled ? 'cursor-not-allowed opacity-80' : ''} `}
    >
      <>
        <CornerDownRightIcon
          size={16}
          strokeWidth={2.6}
          className="h-3.5 w-3.5 lg:h-4 lg:w-4"
        />
        <p className="font-briColage text-xs leading-7 font-bold lg:text-sm">
          Send
        </p>
      </>
    </Button>
  );
};
