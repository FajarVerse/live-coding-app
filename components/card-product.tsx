import Image from "next/image";
import Link from "next/link";

interface CardProductProps {
  children: React.ReactNode;
  id: number;
}

interface CardHeaderProps extends Pick<CardBodyProps, "title"> {
  imgUrl: string;
}

interface CardBodyProps {
  title: string;
  category: string;
  rating: number;
}

interface CardFooterProps {
  price: number;
}

export default function CardProduct({ children, id }: CardProductProps) {
  return (
    <Link key={id} href={`/product/${id}`}>
      <div className="h-auto rounded-2xl p-5 border border-zinc-700 lg:p-4">
        {children}
      </div>
    </Link>
  );
}

function CardHeader({ imgUrl, title }: CardHeaderProps) {
  return (
    <Image
      src={imgUrl}
      alt={title}
      width={100}
      height={100}
      className="h-1/2 w-full rounded-lg bg-white"
    />
  );
}

function CardBody({ title, category, rating }: CardBodyProps) {
  return (
    <div className="mt-2.5 flex flex-col gap-1">
      <div className="w-full flex justify-between">
        <p className="font-medium text-base text-zinc-400 lg:text-sm">
          {category}
        </p>
        <p className="font-medium text-base text-yellow-300 lg:text-sm">
          ⭐ {rating}
        </p>
      </div>
      <h3 className="font-semibold text-lg lg:text-base">{title}</h3>
    </div>
  );
}

function CardFooter({ price }: CardFooterProps) {
  return (
    <p className="font-medium text-xl text-blue-700 lg:text-base text-right mt-1">
      $ {price}
    </p>
  );
}

CardProduct.Header = CardHeader;
CardProduct.Body = CardBody;
CardProduct.Footer = CardFooter;
