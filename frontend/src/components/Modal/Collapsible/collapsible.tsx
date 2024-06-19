import React, { useEffect, useRef, useState } from 'react';
import { downarrowPng } from '../../../assets';
import { updatePrice } from '../../../services';

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

  // Download a file form a url.
  function saveFile(url: string) {
    // Get file name from url.
    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
      a.download = filename; // Set the file name.
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    xhr.open('GET', url);
    xhr.send();
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
              <img
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
              <button className='sendQuoting--btn' onClick={() => {
                setOfficialPrice(newPrice);
                setIsPending(false);
                updatePrice(id, newPrice)
              }}>Enviar!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Collapsible