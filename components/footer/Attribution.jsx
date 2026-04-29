import Image from 'next/image';

const Attribution = () => {
  return (
    <div className="w-fit text-gray-800 max-md:mb-3">
      <p className="mb-2 text-lg font-medium tracking-wide dark:text-white">
        Developed By
      </p>
      <div className="flex w-fit gap-2.5">
        <Image
          className="h-[14vh] w-[14vh] rounded-full border-2 border-red-500 object-cover p-1"
          src="/images/MY-min.jpeg"
          alt="Developer image"
          width={100}
          height={100}
        />
        <div className="flex flex-col justify-center italic dark:text-white">
          <p className="text-lg tracking-wide">Shivendra Dwivedi</p>
          <p className="flex items-center gap-2 text-sm">
            <span>Web Developer</span>
            <span className="text-gray-800 lg:hidden dark:text-gray-300">
              •
            </span>
            <a
              href="https://portfolio.shivendra.site"
              target="__blank"
              className="text-sm tracking-wider text-red-500 underline underline-offset-2 lg:hidden"
            >
              Portfolio
            </a>
          </p>
          <a
            href="https://portfolio.shivendra.site"
            target="__blank"
            className="hidden text-sm tracking-wider text-red-500 underline underline-offset-2 lg:inline"
          >
            Portfolio
          </a>

          {/* Mobile */}
          <div className="mt-2 hidden gap-3 max-md:flex">
            <a
              href="https://www.linkedin.com/in/shivendra-dwivedi"
              className="transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
              target="__block"
            >
              <i className="fa-brands fa-linkedin text-2xl text-[#0077b5] dark:text-[rgb(41,140,240)]"></i>
            </a>
            <a
              href="https://github.com/ShivWK"
              className="transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
              target="__block"
            >
              <i className="fa-brands fa-square-github text-2xl dark:text-gray-300"></i>
            </a>
            <a
              href="https://x.com/Shivendrawk"
              className="transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
              target="__block"
            >
              <i className="fa-brands fa-square-x-twitter text-2xl dark:text-gray-300"></i>
            </a>
            <a
              href="https://instagram.com/shivendrawk"
              className="transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
              target="__block"
            >
              <i
                className="fa-brands fa-instagram text-2xl"
                style={{ color: '#e1306c' }}
              ></i>
            </a>
            <a
              href="mailto:shivendrawk@gmail.com"
              className="transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
            >
              <i
                className="fa-solid fa-envelope text-2xl"
                style={{ color: '#d93025' }}
              ></i>
            </a>
          </div>
        </div>
      </div>

      {/* PC */}
      <div className="mt-7 hidden w-full flex-col gap-2 md:flex">
        <p className="dark:text-white">Social Links</p>
        <div className="flex gap-3">
          <a
            href="https://www.linkedin.com/in/shivendra-dwivedi"
            className="transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
            target="__block"
          >
            <i className="fa-brands fa-linkedin text-2xl text-[#0077b5] dark:text-[rgb(41,140,240)]"></i>
          </a>
          <a
            href="https://github.com/ShivWK"
            className="transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
            target="__block"
          >
            <i className="fa-brands fa-square-github text-2xl dark:text-gray-300"></i>
          </a>
          <a
            href="https://x.com/Shivendrawk"
            className="transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
            target="__block"
          >
            <i className="fa-brands fa-square-x-twitter text-2xl dark:text-gray-300"></i>
          </a>
          <a
            href="https://instagram.com/shivendrawk"
            className="transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
            target="__block"
          >
            <i
              className="fa-brands fa-instagram text-2xl"
              style={{ color: '#e1306c' }}
            ></i>
          </a>
          <a
            href="mailto:shivendra@shivendra.site"
            className="transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
          >
            <i className="fa-solid fa-envelope text-2xl text-[#d93025]"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Attribution;
