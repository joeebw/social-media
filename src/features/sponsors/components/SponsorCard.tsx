import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import Sponsor from "@/assets/ad-coffe.jpg";

const SponsorCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="font-medium">Sponsored</span>
        <span className="text-sm text-gray-400">Create Ad</span>
      </CardHeader>
      <CardContent>
        <ImageWithSkeleton
          src={Sponsor}
          className="object-cover w-full h-full rounded-lg"
          containerClassName="h-[19rem]"
          alt="Coffe sponsor"
        />
      </CardContent>
      <CardFooter className="block">
        <div className="flex justify-between text-sm item-center">
          <span className="font-medium">Moonlight Brews Café</span>
          <span className="text-gray-400">moonlightbrewscafe.com</span>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Discover the perfect cup at Moonlight Brews Café! Whether you're
          starting your day with a bold espresso or unwinding with a smooth
          latte, every sip takes you to a world of flavor.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SponsorCard;
