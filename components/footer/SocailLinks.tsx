const SocialLinks = ({ wrapper = true }: { wrapper: boolean }) => {
  return (
    <div
      className={`${wrapper ? 'rounded-md px-3 pt-2 pb-1' : 'mt-2 rounded-md px-2 py-0.5'} flex w-fit items-center gap-3 bg-blue-950 dark:bg-gray-950`}
    >
      <a
        href="https://www.linkedin.com/in/shivwk"
        className="-mb-0.5 transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
        target="__block"
      >
        <i className="fa-brands fa-linkedin text-2xl text-[rgb(46,145,243)]" />
      </a>

      <a
        href="https://github.com/ShivWK"
        className="-mb-0.5 transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
        target="__block"
      >
        <i className="fa-brands fa-square-github text-2xl text-gray-300" />
      </a>

      <a
        href="https://x.com/Shivendrawk"
        className="-mb-0.5 transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
        target="__block"
      >
        <i className="fa-brands fa-square-x-twitter text-2xl text-gray-300" />
      </a>

      <a
        href="https://instagram.com/shivendrawk"
        className="pt-1 transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
        target="__block"
      >
        <i className="fa-brands fa-instagram text-2xl text-[#e1306c]" />
      </a>

      <a
        href="mailto:shivendra@shivendra.site"
        className="pt-1 transition-all duration-100 ease-in hover:scale-[1.3] hover:shadow-lg"
      >
        <i className="fa-solid fa-envelope text-2xl text-[#d93025]" />
      </a>
    </div>
  );
};

export default SocialLinks;
