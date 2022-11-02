---
layout: time-zones
title: If we stop changing our clocks, what’s the ideal time zone for each US state?
permalink: /time-zones.html
---

There’s a good chance that this November will be the last time we “fall back” from daylight saving time to standard time in the United States. The [Sunshine Protection Act](https://en.wikipedia.org/wiki/Sunshine_Protection_Act) passed the Senate unanimously. It appears to have a lot of support in the House as well. If it passes both houses and is signed by the President, we’ll “spring forward” to Daylight Saving Time next March, and we’ll never change our clocks again.

Most people agree that changing our clocks twice a year does much more harm than good. But it’s less clear whether we should settle on permanent daylight saving time, or permanent standard time. In Seattle, for instance, under permanent daylight saving time, the sun would rise just before 9am at the beginning of winter! Whereas in Boston, under permanent standard time, the sun sets around 4:15pm at that time of year. Neither of these outcomes is very appealing.

I’d like to propose that when debating whether to keep permanent daylight saving time or permanent standard time, we’re asking the wrong question. The right question to be asking is: **what should our time zone be?** We should ask that question for each state in the country, trying to find the best answer for each.

## How does Daylight Saving Time relate to time zones?

A time zone is an area of the planet where it’s the same time everywhere within that area. The particular time it is in the time zone is determined by the time zone’s **GMT offset**: this is the number of hours the time zone is different from a time called **Greenwich Mean Time**. Greenwich Mean Time is the time used in the United Kingdom in the winter.

So, consider Pacific Standard Time. This has a GMT offset of -8 (this is written **GMT-8**). That means that if the GMT time is 12:00 noon, then it’s 4:00am in Pacific Standard Time.

During daylight saving time, though, the west coast doesn’t use Pacific Standard Time. It uses Pacific Daylight Time, which has a GMT offset of -7. Thus, noon GMT is 5:00am PDT. This is an hour “later” according to the clocks, which is why we “spring forward” to go from standard time to daylight saving time.

There’s another time zone that has a GMT offset of -7: Mountain Standard Time. In the winter months, noon GMT is 5:00am MST, meaning it’s 5:00am in Denver. That means that we can think of Daylight Saving Time in a different way than we usually do: **everyone just switches time zones**. The west coast switches from Pacific Standard Time to Mountain Standard Time; the mountain states switch from Mountain Standard Time to Central Standard Time, and so on.

If we’re going to get rid of Daylight Saving Time—the part where we switch our clocks twice a year—we really just want to make sure that each state lands in the ideal time zone, which is to say the ideal GMT offset. For some states, this would look like “permanent daylight saving time”, and for others it would look like “permanent standard time”, but what we really want to do is just redraw the time zone map.

# Proposed new time zones

I propose that we have five time zones in the lower 48 states, rather than the four we currently have. After introducing the new time zones, I’ll explain how I decided on these particular zones, with the states I’ve put in them. But first, the ideal time zone map of the United States, according to me:

<img src="/images/us-map.svg">

The five zones are:

{: .time-zones}

| Time zone                  | GMT offset | Formerly known as                               |
| -------------------------- | ---------- | ----------------------------------------------- |
| New England Standard Time  | -4         | Eastern Daylight Time                           |
| East–Central Standard Time | -5         | Eastern Standard Time<br>Central Daylight Time  |
| Plains Standard Time       | -6         | Central Standard Time<br>Mountain Daylight Time |
| Western Standard Time      | -7         | Mountain Standard Time<br>Pacific Daylight Time |
| Cascadia Standard Time     | -8         | Pacific Standard Time                           |

Alaska and Hawaii keep their current respective standard times, Alaska Standard Time and Hawaii Standard Time.

This map may look a bit surprising! I’ll discuss some of the more unintuitive aspects below, but first, let me explain how I came up with this map.

# Methodology

In order to assign states to time zones, I start by proposing an answer to another question: what is the ideal time zone in any given _place_? To answer this question, we don’t have to worry about the size or shape of a state. We just want to have an opinion about what the best time zone is for exactly where you happen to be standing.

Before explaining my answer to that question, I’ll need to introduce one more bit of terminology: **solar noon**. Solar noon is, quite simply, when the sun is highest in the sky. You might think that this happens at 12:00pm, but in most places, that’s not the case. Depending on where you are within your time zone, solar noon can be earlier or later than noon. During daylight saving time, it’s pretty much always going to be later than noon, and it’s not unusual to have it happen after 1:00pm.

The fact that we’re strongly considering permanent Daylight Saving Time in the United States reveals something about our society: **we prefer later sunsets**. I wanted to design a time zone map that respects that preference, while also ensuring that we don’t shift things _too_ late, like the example of Seattle in the winter under Pacific Daylight Time.

So, I’m defining the ideal time zone as **the time zone where solar noon is between 12:00pm and 1:00pm on the clock**. Since there are 24 possible GMT offsets, and 24 hours in the day, this produces exactly one ideal time zone for any given place. And it builds in our preference for later sunsets: while solar noon could in principle be either before or after 12:00pm, we’re saying we always want it to be after. A later solar noon means a later sunset.

## Optimizing state time zones

It would be nice if we could just put every city, town, and county in its ideal time zone, but it wouldn’t be practical. Time zone boundaries would cut right through the middle of states, and it would be really hard for people living near those boundaries to keep track of what time it is. So, we need a way to figure out the best time zone for a whole state.

I chose to do that by figuring out how _bad_ each potential time zone is for each state, following this set of steps:

1. Go through each county in the state.
2. Try out different time zones for the geographical center of that county. If it’s the ideal time zone, don’t penalize it at all. If it’s outside the ideal time zone, penalize it by the number of minutes outside. So if solar noon is at 1:04pm, that’s a penalty of 4.
3. Multiply the penalty by the population of the county. For a county of 1,000 people with solar noon at 1:04pm, the penalty is 4,000.
4. Add up all the penalties for all the counties in the state. That’s the overall penalty for the state in the time zone we’re considering.
5. Pick the time zone that has the lowest penalty.

I wrote a Python script to perform this analysis automatically; you can see it [on GitHub](https://github.com/outoftime/time-zones/blob/main/time_zones.py).

This is a fairly utilitarian approach: we end up finding the time zone that produces an ideal solar noon (or gets as close to it as possible) for as many people in the state as we can. It’s certainly not the only possible approach, but I think it’s a pretty sensible one.

I also think it yields a pretty sensible map of time zones, although it has some surprises. With an understanding of how the map was generated, we can discuss where those surprises came from.

# Unexpected time zones

I think the most surprising outcome is that Philadelphia and Chicago are in the same time zone! As it turns out, though, Philadelphia’s ideal time zone is in fact GMT-5, which gives it a solar noon at almost exactly 12:00pm. And, of course, anywhere west of Philadelphia is going to get a later solar noon, which keeps it in the ideal band all the way to Pittsburgh.

Chicago’s ideal time zone is also GMT-5, which gives it a solar noon of 12:51pm. The westernmost county in Illinois gets a solar noon of 1:04pm; GMT-6 would be better, but it’s barely outside the ideal range for GMT-5, and of course the state is much more densely populated around Chicago than anywhere else.

Another surprising outcome is that Washington and Oregon are in a different time zone from California. But the major populations of the Cascadia states are on their western edges, in cities like Seattle and Oregon, which are in fact further west than _any_ major city in California. GMT-8 gives Seattle a comfortable solar noon of 12:12pm.

Unfortunately, there isn’t a very good time zone for all of California. GMT-7 gives San Francisco a solar noon at 1:09pm, which is pretty far from ideal. GMT-8 gives Los Angeles a solar noon at 11:52am, which is just as far from ideal. Both the Bay Area and southern California are densely populated, but southern California has Orange County and San Diego, which have large populations and are even further to the east. So, GMT-7 wins.

# Back to the Daylight Saving Time question

Just like we can describe Daylight Saving Time as switching time zones, we can describe the proposed time zone map as a state-by-state decision about whether to stay on standard time or Daylight Saving Time. Looking at it this way, we’d get the following:

<table>
<tr>
<th>Standard Time</th>
<th>Daylight Saving Time</th>
</tr>
<tr>
<td>
Alabama*<br>
Arizona<br>
Arkansas<br>
Colorado<br>
Delaware<br>
Florida*<br>
Georgia<br>
Idaho*<br>
Indiana*<br>
Iowa<br>
Kansas*<br>
Louisiana<br>
Maryland<br>
Michigan<br>
Minnesota<br>
Mississippi<br>
Missouri<br>
Montana<br>
Nebraska*<br>
New Mexico<br>
North Carolina<br>
North Dakota*<br>
Ohio<br>
Oklahoma<br>
Oregon<br>
Pennsylvan<br>ia
South Carolina<br>
South Dakota*<br>
Texas*<br>
Utah<br>
Virginia<br>
Washington<br>
West Virginia<br>
Wyoming
</td>
<td>
California<br>
Connecticut<br>
Illinois*<br>
Kentucky*<br>
Maine<br>
Massachusetts<br>
Nevada<br>
New Hampshire<br>
New Jersey<br>
New York<br>
Rhode Island<br>
Tennessee*<br>
Vermont<br>
Wisconsin
</td>
</tr>
</table>

_\*Many states contain two time zones in different regions of the state; the list above is based on the predominant time zone for each state._

# So what should we do?

My proposal is to update the Sunshine Protection Act to not only eliminate the twice-yearly time switches, but also to enshrine these new time zones into law. Implementing permanent daylight saving time will already create big logistical headaches, require a lot of software to be updated, and so on. Let’s take the opportunity to also rationalize our time zone map, which would be unlikely to require much more effort than we’re already putting into permanent DST.

If Congress refuses to act on this sensible proposal, another option would be for the Secretary of Transportation to [enact the new time zones by their regulatory authority](https://www.transportation.gov/regulations/procedure-moving-area-one-time-zone-another). This would require a petition from each state legislature that wants to move time zones, which under a permanent DST regime would be a large majority of states. But it also offers an avenue for state-by-state rationalization of the time zones, even if Congress won’t do it all at once.
