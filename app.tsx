import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="bg-[#071015] text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-400 rounded-full" />
          DropMyElectronic
        </div>
        <div className="flex items-center gap-8 text-gray-300">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#blog" className="hover:text-white">Blog</a>
          <a href="#support" className="hover:text-white">Support</a>
          <Button className="bg-blue-400 hover:bg-blue-500 text-black font-semibold">Start now</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-16 py-20">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-6xl font-bold leading-tight">
            E-waste made easy, <br /> for everyone
          </h1>
          <p className="text-gray-300 text-lg">
            Quickly find local e-waste drop-off points and learn how to recycle electronics the right way.
            Discover simple tips for safe battery and device disposal, and see how your actions help build
            a cleaner, more sustainable world.
          </p>
          <Button className="bg-blue-400 hover:bg-blue-500 text-black font-semibold px-10 py-6 rounded-xl">
            Find nearby
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10 md:mt-0 md:w-1/2">
          <img src="/images/group-meeting.jpg" alt="People collaborating" className="rounded-xl" />
          <img src="/images/hands-laptop.jpg" alt="Hands recycling electronics" className="rounded-xl" />
          <img src="/images/community-cleanup.jpg" alt="Community cleanup" className="rounded-xl" />
          <img src="/images/team-plants.jpg" alt="Team planting trees" className="rounded-xl" />
        </div>
      </section>

      {/* Drop-off Section */}
      <section className="px-16 py-20">
        <h2 className="text-4xl font-bold mb-6">E-waste recycling made easy</h2>
        <p className="text-gray-300 mb-10 max-w-3xl">
          Quickly find safe, local drop-off points for your old electronics and batteries. We connect you with trusted recyclers,
          making responsible disposal simple and stress-free.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-[#0f1b20] border-none">
            <CardContent className="p-8 space-y-4">
              <h3 className="text-2xl font-semibold">Find locations</h3>
              <p className="text-gray-400">Enter your zip code to discover certified e-waste drop-off centers nearby.</p>
              <a href="#" className="text-blue-400 hover:underline">Search →</a>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1b20] border-none">
            <CardContent className="p-8 space-y-4">
              <h3 className="text-2xl font-semibold">What’s accepted</h3>
              <p className="text-gray-400">Check which devices, batteries, and electronics each location can take.</p>
              <a href="#" className="text-blue-400 hover:underline">View list →</a>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1b20] border-none">
            <CardContent className="p-8 space-y-4">
              <h3 className="text-2xl font-semibold">Trusted centers</h3>
              <p className="text-gray-400">All listed recycling partners meet strict environmental standards.</p>
              <a href="#" className="text-blue-400 hover:underline">See partners →</a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* E-waste Essentials Section */}
      <section className="px-16 py-20 bg-[#0b161b]">
        <h2 className="text-4xl font-bold mb-6">E-waste made easy. Start here.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-[#0f1b20] border-none">
            <CardContent className="p-8 space-y-4">
              <img src="/images/electronic-device.jpg" alt="Recycling electronics" className="rounded-lg" />
              <h3 className="text-2xl font-semibold">Why recycle your electronics?</h3>
              <p className="text-gray-400">Learn how recycling electronics helps the planet and saves resources.</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1b20] border-none">
            <CardContent className="p-8 space-y-4">
              <img src="/images/recycling-meeting.jpg" alt="Where to recycle" className="rounded-lg" />
              <h3 className="text-2xl font-semibold">Where to recycle near you</h3>
              <p className="text-gray-400">Quickly find trusted drop-off locations for batteries, phones, and more.</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1b20] border-none">
            <CardContent className="p-8 space-y-4">
              <img src="/images/prep-device.jpg" alt="Prepare devices" className="rounded-lg" />
              <h3 className="text-2xl font-semibold">How to prep your devices</h3>
              <p className="text-gray-400">Follow easy tips to wipe data and ensure your e-waste is recycled responsibly.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
