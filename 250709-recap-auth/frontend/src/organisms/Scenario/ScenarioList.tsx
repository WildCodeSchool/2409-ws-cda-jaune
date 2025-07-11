import { Button } from "@/lib/shadcn/generated/ui/button";
import type { Entities } from "@/types/entities";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../lib/shadcn/generated/ui/card";

type Props = {
  title: string;
  data: Array<Entities.Scenario>;
};
export default function ScenarioList({ title, data }: Props) {
  if (!data.length)
    return (
      <>
        <h2>{title}</h2>
        <p>Rien à afficher ici :shrug: </p>
      </>
    );

  return (
    <>
      <h2>{title}</h2>
      <ul className="flex gap-4">
        {data.map((scenario) => {
          const _url = `/files/${scenario.bannerUrl}`;
          return (
            <li key={scenario.id}>
              <Card
                className="m-1 h-60 w-96 gap-4"
                style={{ backgroundImage: `url(/files/${scenario.bannerUrl})` }}
              >
                <CardHeader>
                  <CardTitle>{scenario.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ScrollArea className="h-full">{scenario.teaser}</ScrollArea>{" "}
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}
