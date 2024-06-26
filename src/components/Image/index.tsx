import NextImage from "next/image";

export const Image = ({ fill, ...rest }: any) => {
  if (rest.src) {
    return <NextImage {...rest} fill={fill} unoptimized />;
  }

  return <img {...rest} />;
};
