import React, { useEffect, useRef, useState } from 'react';
import { downarrowPng } from '../../../assets';
import { updatePrice } from '../../../services';
import { saveFile } from '../../../utils';

interface CollapsibleProps {
  open?: boolean
  headerClassName?: string;
  titleClassName?: string;
  iconButtonClassName?: string;
  contentClassName?: string;
  contentContainerClassName?: string;
  collapsibleClassName?: string;
  title: string;
  pending: boolean;
  price: number;
  url: string;
  id: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  open,
  collapsibleClassName = "collapsible-card",
  headerClassName = "collapsible-header",
  titleClassName = "title-text",
  iconButtonClassName = "collapsible-icon-button",
  contentClassName = "collapsible-content",
  contentContainerClassName = "collapsible-content-padding",
  title,
  pending,
  price,
  url,
  id
}) => {
  const [officialPrice, setOfficialPrice] = useState(price);
  const [isPending, setIsPending] = useState(pending);
  const [newPrice, setNewPrice] = useState(price);
  const [isOpen, setIsOpen] = useState(open);
  const [height, setHeight] = useState<number | undefined>(
    open ? undefined : 0
  );
  const ref = useRef<HTMLDivElement>(null);
  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined;
    // @ts-ignore
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);

  const handleSendButton = async () => {
    setOfficialPrice(newPrice);
    setIsPending(false);
    await updatePrice(id, newPrice);
    window.location.reload();
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(parseFloat(event.target.value));
  }

  return (
    <>
      <div className={collapsibleClassName}>
        <div>
          <div className={headerClassName}>
            <div className={titleClassName}>
              <div>{title}</div>
              <div className='quotedPrice'>{isPending ? <>pending!</> : <>{officialPrice}</>}</div>
            </div>
            <button
              type="button"
              className={iconButtonClassName}
              onClick={handleFilterOpening}
            >
              <img alt='collapsible'
                className={`quoting-collapsible ${isOpen
                  ? "rotate-center-down"
                  : "rotate-center-up"
                  }`}
                src={downarrowPng}
              />
            </button>
          </div>
        </div>
        <div className={contentClassName} style={{ height }}>
          <div ref={ref}>
            <div className={contentContainerClassName}>
              <button className='download--btn' onClick={() => saveFile(url)}>Baixar Arquivo</button>
              <input className='quoting--input' onChange={handleInputChange} placeholder='digite o valor' type="number"></input>
              <button className='sendQuoting--btn' onClick={handleSendButton}>Enviar!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Collapsible