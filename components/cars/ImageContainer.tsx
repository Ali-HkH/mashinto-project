import Image from 'next/image';

function ImageContainer({
  mainImage,
  name,
}: {
  mainImage: string;
  name: string;
}) {
  return (
    <section className='h-[300px] md:h-[500px] relative mt-8'>
      <Image
        src={mainImage}
        alt={name}
        fill
        priority
        sizes='65vw'
        className='object-cover rounded-md'
      />
    </section>
  );
}
export default ImageContainer;