import React, { useEffect, useState, useRef } from 'react';
import './NumberScroll.css';

interface NumberScrollProps {
  startNumber?: number; // 起始数字
  endNumber: number; // 目标数字
  duration?: number; // 动画持续时间(ms)
  delay?: number; // 开始延迟时间(ms)
  className?: string; // 自定义样式类名
  isRunning?: boolean; // 控制是否开始滚动
  onEnd?: () => void; // 动画结束回调
}

export const NumberScroll: React.FC<NumberScrollProps> = ({
  startNumber = 0,
  endNumber,
  duration = 2000,
  delay = 0,
  className = '',
  isRunning = false,
  onEnd = () => {}
}) => {
  const [currentNumber, setCurrentNumber] = useState(startNumber);
  const startTime = useRef<number | null>(null);
  const animationFrame = useRef<number>();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('zh-CN').format(Math.round(num));
  };

  useEffect(() => {
    // 重置状态
    startTime.current = null;

    if (!isRunning) {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      setCurrentNumber(startNumber);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;

      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);

      const easeOutExpo = 1 - Math.pow(2, -10 * percentage);
      const currentValue = easeOutExpo * endNumber;

      setCurrentNumber(currentValue);

      if (percentage < 1 && isRunning) {
        animationFrame.current = requestAnimationFrame(animate);
      } else if (percentage >= 1) {
        setCurrentNumber(endNumber);
        // 动画完成时调用onEnd回调
        onEnd();
      }
    };

    const timer = setTimeout(() => {
      animationFrame.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [endNumber, duration, delay, isRunning, onEnd]);

  // 如果不在运行状态，返回空内容
  if (!isRunning) return null;

  return (
    <div className={`number-scroll ${className}`}>
      <span style={{ fontSize: '2.5rem', color: '#FFD700' }}>£</span>
      {formatNumber(currentNumber)}
    </div>
  );
};
