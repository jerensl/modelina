
import { useMeasure } from '@uidotdev/usehooks';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { type ReactNode, useEffect } from 'react';

interface ResizableComponentProps {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}

/**
 * @description This is the resizable component.
 * @type {React.FC<ResizableComponentProps>} Props
 * @property {React.ReactElement} leftComponent The left element which will be stretch.
 * @property {React.ReactElement} rightComponent The right element which will be stretch.
 */
function Resizable({ leftComponent, rightComponent }: ResizableComponentProps) {
  const [ref, { width: containerWidth }] = useMeasure();
  const DefaultWidth = 600;

  const dragableX = useMotionValue(DefaultWidth);
  const width = useTransform(dragableX, (value) => `${value + 0.5 * 4}px`);

  useEffect(() => {
    if (containerWidth !== null) {
      dragableX.set(Math.round(containerWidth / 2));
    }
  }, [containerWidth]);

  return (
    <section ref={ref} className='grid size-full bg-code-editor-dark md:grid-cols-[auto_auto]'>
      <motion.article
        style={{ width }}
      >
        {leftComponent}
      </motion.article>
      <motion.aside
        role='separator'
        title='drag to resize'
        style={{ x: dragableX }}
        className={'absolute z-10 hidden h-[90vh] w-4 cursor-col-resize hover:bg-gray-300/20 focus:cursor-col-resize active:bg-gray-300/25 md:block'}
        dragMomentum={false}
        drag='x'
        dragElastic={0}
        dragConstraints={{
          left: containerWidth === null ? DefaultWidth * .2 : containerWidth * .2,
          right: containerWidth === null ? DefaultWidth * .8 : containerWidth * .8
        }}
      />
       <motion.article className='h-full overflow-y-hidden'>
        {rightComponent}
       </motion.article>
    </section>
  );
}

Resizable.displayName = 'Resizable Component';

export default Resizable;
