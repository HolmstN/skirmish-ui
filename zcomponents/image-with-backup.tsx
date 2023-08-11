import classNames from "classnames";
import Image from "next/image";
import React, { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Image>, "src"> & { src?: string };

export const ImageWithBackup: React.FC<Props> = ({ src, ...props }) => {
  if (!src) {
    const className = classNames(
      props.className,
      "bg-gradient-to-br from-indigo-500 to-pink-500"
    );
    return <div className={className} />;
  }
  return <Image src={src} {...props} />;
};
