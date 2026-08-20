import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const galleryImages = [
  { src: '/img/owen-lucas-rope.jpg', alt: 'Owen and Lucas roping up', orientation: 'landscape' },
  // { src: '/img/rope-portrait.jpg', alt: 'Climber roped up and ready to climb', orientation: 'portrait' },
  { src: '/img/joy-group-photo.jpg', alt: 'Club members celebrating together', orientation: 'landscape' },
  { src: '/img/everett-aura.jpg', alt: 'Everett sending a route', orientation: 'landscape' },
  // { src: '/img/caro-portrait.jpg', alt: 'Club member portrait', orientation: 'portrait' },
  { src: '/img/LP-group.jpg', alt: 'Club members at Movement Lincoln Park', orientation: 'landscape' },
  { src: '/img/owen-dyno.jpg', alt: 'Member mid-dyno on the wall', orientation: 'landscape' },
  { src: '/img/lucas-overhang.jpg', alt: 'Lucas on overhang', orientation: 'landscape' },
  { src: '/img/santos-heelhook.jpg', alt: 'Santos heel hook', orientation: 'landscape' },
];

const galleryImageSize = {
  landscape: 'w-72 sm:w-[26rem] md:w-[34rem] lg:w-[40rem] aspect-[4/3]',
  portrait: 'w-48 sm:w-60 md:w-64 aspect-[3/4]',
};

const galleryArrowClass =
  'staatliches absolute top-1/2 -translate-y-1/2 shrink-0 z-10 bg-gray-300/60 backdrop-blur-sm text-[#011638] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-md hover:bg-gray-300/90 transition-colors cursor-pointer';

function Home() {
  const navigate = useNavigate();
  const [galleryIndex, setGalleryIndex] = useState(0);

  const showPrevImage = () => {
    setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextImage = () => {
    setGalleryIndex((i) => (i + 1) % galleryImages.length);
  };

  return (
    <div className="bg-[#EEFCFF] font-[Ledger] text-[#011638] overflow-x-hidden">

      {/* Hero */}
      <div className="flex relative w-full justify-center items-center">
        <img
          src='/img/aurafarm.jpg'
          alt='aura farm'
          className="h-full w-full object-cover"
        />
        <div className="absolute text-center">
          <h1 className="staatliches tracking-wide lg:mb-28 md:mb-18 mb-6 text-white lg:text-5xl md:text-3xl text-lg">
            Welcome to
          </h1>
          <h1 className="staatliches tracking-wide lg:mb-36 md:mb-26 mb-16 text-white lg:text-8xl md:text-6xl text-4xl">
            DePaul Rock Climbing</h1>
        </div>
      </div>

      {/* Intro + Photo Scrapbook */}
      <section className="relative px-4 sm:px-8 pt-14 pb-16 md:pt-20 md:pb-24 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="staatliches text-4xl md:text-6xl tracking-wide mb-4">
            Climb With <span className="text-[#D7263D]">Us</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl leading-snug">
            Whether you've never touched a wall or you're flashing v10,
            DePaul Rock Climbing is the perfect place to climb. <span className="font-bold">All skill levels are welcome! </span>
            No experience necessary, plus we get food after each meeting.
          </p>
        </div>

        {/* Polaroid gallery */}
        <div className="flex justify-center">
          <div className="relative inline-block">
            <img
              src={galleryImages[galleryIndex].src}
              alt={galleryImages[galleryIndex].alt}
              className={`${galleryImageSize[galleryImages[galleryIndex].orientation]} object-cover border-8 border-white shadow-xl rotate-[-2deg]`}
            />

            <button
              onClick={showPrevImage}
              aria-label="Previous photo"
              className={`${galleryArrowClass} left-0 -translate-x-1/2`}
            >
              &#8249;
            </button>

            <button
              onClick={showNextImage}
              aria-label="Next photo"
              className={`${galleryArrowClass} right-0 translate-x-1/2`}
            >
              &#8250;
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {galleryImages.map((image, i) => (
            <button
              key={image.src}
              onClick={() => setGalleryIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${i === galleryIndex ? 'bg-[#011638]' : 'bg-[#011638]/25'}`}
            />
          ))}
        </div>
      </section>

      {/* All Levels / Competitive Team Stamps */}
      <section className="px-4 sm:px-8 pb-16 md:pb-24 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16">
          <div className="staatliches text-center bg-[#011638] text-white rounded-full w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 flex flex-col items-center justify-center border-4 border-dashed border-white/70 rotate-[-4deg] shadow-xl p-4 shrink-0">
            <p className="text-2xl sm:text-3xl md:text-4xl leading-tight">ALL LEVELS<br />WELCOME</p>
            <p className="text-xs sm:text-sm mt-2 tracking-widest">FIRST-TIMERS TO CRUSHERS</p>
          </div>
          <div className="staatliches text-center bg-[#D7263D] text-white rounded-full w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 flex flex-col items-center justify-center border-4 border-dashed border-white/70 rotate-[3deg] shadow-xl p-4 shrink-0">
            <p className="text-2xl sm:text-3xl md:text-4xl leading-tight">COMPETITIVE<br />TEAM</p>
            <p className="text-xs sm:text-sm mt-2 tracking-widest">USAC COLLEGIATE COMPETITIONS</p>
          </div>
        </div>
      </section>

      {/* Member Perks - Sticky Notes */}
      <section className="px-4 sm:px-8 pb-16 md:pb-24 max-w-5xl mx-auto">
        <div className="flex items-center justify-center mb-10">
          <div className="h-px w-16 sm:w-32 bg-[#011638]"></div>
          <h2 className="staatliches mx-4 text-center text-3xl md:text-5xl tracking-wide">MEMBER PERKS</h2>
          <div className="h-px w-16 sm:w-32 bg-[#011638]"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="staatliches bg-yellow-100 shadow-lg w-48 sm:w-56 md:w-60 p-6 text-center rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
            <p className="text-xl md:text-2xl">Free Gear Rentals</p>
          </div>
          <div className="staatliches bg-yellow-100 shadow-lg w-48 sm:w-56 md:w-60 p-6 text-center rotate-[2deg] hover:rotate-0 transition-transform duration-300">
            <p className="text-xl md:text-2xl">Discounted Day Passes</p>
          </div>
          <div className="staatliches bg-yellow-100 shadow-lg w-48 sm:w-56 md:w-60 p-6 text-center rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
            <p className="text-xl md:text-2xl">A Great Climbing Community</p>
          </div>
        </div>
      </section>

      {/* When We Meet - Ticket Stubs */}
      <section className="px-4 sm:px-8 pb-16 md:pb-24 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-10">
          <div className="h-px w-16 sm:w-32 bg-[#011638]"></div>
          <h2 className="staatliches mx-4 text-center text-3xl md:text-5xl tracking-wide">WHEN WE MEET</h2>
          <div className="h-px w-16 sm:w-32 bg-[#011638]"></div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10">
          <div className="staatliches border-4 border-dashed border-[#011638] bg-white px-10 py-6 text-center rotate-[-1deg] w-full sm:w-auto">
            <p className="text-2xl md:text-3xl tracking-wide">WEDNESDAYS</p>
            <p className="text-lg md:text-xl text-[#D7263D]">6:00 - 9:00 PM</p>
          </div>
          <div className="staatliches border-4 border-dashed border-[#011638] bg-white px-10 py-6 text-center rotate-[1deg] w-full sm:w-auto">
            <p className="text-2xl md:text-3xl tracking-wide">FRIDAYS</p>
            <p className="text-lg md:text-xl text-[#D7263D]">1:00 - 4:00 PM</p>
          </div>
        </div>
      </section>

      {/* Pricing + Join CTA */}
      <section className="px-4 sm:px-8 pb-20 md:pb-28 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-10">
          <div className="h-px w-16 sm:w-32 bg-[#011638]"></div>
          <h2 className="staatliches mx-4 text-center text-3xl md:text-5xl tracking-wide">JOIN THE CLUB</h2>
          <div className="h-px w-16 sm:w-32 bg-[#011638]"></div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-14 mb-10">
          <div className="staatliches bg-[#011638] text-white rounded-full w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center rotate-[-6deg] shadow-lg shrink-0">
            <p className="text-3xl sm:text-4xl md:text-5xl">$15</p>
            <p className="text-xs sm:text-sm tracking-widest mt-1">DAY PASS</p>
          </div>
          <div className="staatliches bg-[#233EA1] text-white rounded-full w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center rotate-[5deg] shadow-lg shrink-0">
            <p className="text-3xl sm:text-4xl md:text-5xl">$10</p>
            <p className="text-xs sm:text-sm tracking-widest mt-1">QUARTERLY DUES</p>
          </div>
        </div>

        <p className="text-lg md:text-xl max-w-xl mx-auto mb-6">
          You'll need an account to buy day passes or pay dues — it only takes a minute.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/register')}
            className="staatliches bg-[#D7263D] text-white px-8 py-3 text-xl tracking-wide shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            Create an Account
          </button>
          <button
            onClick={() => navigate('/passes')}
            className="staatliches border-4 border-[#011638] text-[#011638] px-8 py-3 text-xl tracking-wide hover:scale-105 transition-transform cursor-pointer"
          >
            View Passes
          </button>
        </div>
      </section>

      {/* Torn paper divider */}
      <div className="torn-divider bg-[#011638] h-8 md:h-14 w-full"></div>

      {/* Meeting Locations Section */}
      <div className="py-12 px-6 staatliches">

        {/* Meeting Locations */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center">
            <div className="h-px w-48 bg-[#011638]"></div>
            <h2 className="mx-4 tracking-wider text-4xl">MEETING LOCATIONS</h2>
            <div className="h-px w-48 bg-[#011638]"></div>
          </div>

          <div className="flex border-4 border-[#011638] p-6 mt-6 max-w-2xl mx-auto bg-white justify-between">
            <img
              src="../../img/location-icon.png"
              alt="Location Icon"
              className="lg:w-48 lg:h-48 md:w-36 md:h-36 w-24 h-24"
            />
            <div className="flex flex-col items-center mr-14 mt-4 text-3xl">

              <div className="text-center">
                <p className="uppercase">Movement Lincoln Park (LP)</p>
                <p className="text-lg">1460 N Dayton St, Chicago, IL 60642</p>
                <p className="uppercase mt-4">Movement Wrigleyville (WRIG)</p>
                <p className="text-lg">1115 W Addison St, Chicago, IL 60613</p>
              </div>
            </div>
          </div>

          <p className="text-[#D7263D] mt-4 text-lg md:text-3xl tracking-widest">
            CHECK OUR CALENDAR TO SEE WHICH GYM WE ARE AT PER MEETING!
          </p>
        </div>

        {/* Leadership */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="h-px w-48 bg-[#011638]"></div>
            <h2 className="mx-4 tracking-wider text-4xl">LEADERSHIP</h2>
            <div className="h-px w-48 bg-[#011638]"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
            {/* Lucas */}
            <div className="bg-white shadow-lg w-60">
              <div className="bg-gray-200 h-60 flex items-center justify-center">
                <img
                  src="../../img/lucas.jpg"
                  alt="Lucas Pazen"
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="bg-yellow-100 py-4 px-2 tracking-wide">
                <p className="text-lg">LUCAS PAZEN</p>
                <p className="text-md">CO-PRESIDENT</p>
                <p className="text-xs">LPAZEN@DEPAUL.EDU</p>
              </div>
            </div>

            {/* Santos */}
            <div className="bg-white shadow-lg w-60">
              <div className="bg-gray-200 h-60 flex items-center justify-center">
                <img
                  className="object-cover h-full w-full"
                  src="../../img/new-santos.JPG"
                  alt="Santos Rivera"
                />
              </div>
              <div className="bg-yellow-100 py-4 px-2 tracking-wide">
                <p className="text-lg">SANTOS RIVERA</p>
                <p className="text-med">CO-PRESIDENT</p>
                <p className="text-xs">SRIVER58@DEPAUL.EDU</p>
              </div>
            </div>

            {/* Ellie */}
            <div className="bg-white shadow-lg w-60">
              <div className="bg-gray-200 h-60 flex items-center justify-center overflow-hidden">
                <img src="../../img/ellie-profile.jpg" alt="Ellie Kim" className="object-cover h-full w-full" />
              </div>
              <div className="bg-yellow-100 py-4 px-2 tracking-wide">
                <p className="text-lg">ELLIE KIM</p>
                <p className="text-med">TREASURER</p>
                <p className="text-xs">EKIM79@DEPAUL.EDU</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Home;
