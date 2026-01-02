
function Home() {
    return (
      <div className="bg-[#EEFCFF] font-[Ledger] text-[#011638]">
      
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

            <div className="flex flex-col items-start md:flex-row gap-12 ml-4">
                {/* Owen Dyno Image */}
                <img
                  src="/img/owen-dyno.jpg"
                  alt="Owen Dyno"
                  className="md:w-1/2 rounded-lg shadow-lg mt-16"
                />

                {/* Text + Pricing Section */}
                <div className="flex flex-col font-[Ledger] text-[#011638] lg:text-4xl md:text-3xl text-2xl gap-6 lg:mt-36 md:mt-24 mt-4">
                  {/* What we have */}
                  <div>
                    <p className="mb-4">What we have!</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Free Rentals</li>
                      <li>Discounted Day Passes</li>
                      <li>A Great Climbing Community!</li>
                    </ul>
                    <p className="mt-4 text-lg max-w-md text-center">
                      All levels are welcome! We have a large range of experience where everyone is able to come together and learn from each other.
                    </p>
                  </div>

                  {/* Pricing Section */}
                  <section className="text-center staatliches bg-[#011638] text-white px-20 py-6 space-y-4 ml-36 md:mr-6 lg:ml-16 
                  mt-6 md:mt-12 lg:mt-24 lg:text-5xl md:text-3xl text-2xl w-fit self-center">
                    <p>Day Pass: $15</p>
                    <p>Quarterly Dues: $10</p>
                  </section>
                </div>

              </div>

                {/* Elliott Image */}
                <div className="elliott-container -mt-8 md:-mt-16 lg:-mt-24">
                  <img 
                    className="w-full"
                    src="../../img/elliott-campus.png"
                    alt="elliott campus"
                  />
                </div>

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
