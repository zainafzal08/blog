---
layout: "../../layouts/BlogPost.astro"
title: "Proving Math Hacks"
description: "Ever wondered why some of the math hacks you see online work? no? oh."
pubDate: "Aug 18 2022"
tags: ["math"]
---

# What is a math hack?

I personally have started seeing them now that tik tok has took over most of my
waking hours but they've existed for a while.

TLDR: It's basically when someone shows you a semi involved operation
and then shows some magic hack where you can fiddle with the numbers to arrive
at the right solution via a simplier method. For example this [pinterest link](https://www.pinterest.com.au/pin/645422190363791447/?mt=login) shows a hack for multiplying $55$ by any single
digit number $n$, the output turns out is always $5 \times n$ with the digits in
the results added in and put in the middle. I.e. $5 \times 6$ is $45$ and then
you stick $9$ in the middle to get $495$.

It works! Huzzah now if you ever need to specifically multiply 55 by a number you
can. Now if your a normal person with a life and friends you go "huh neat" and
move on with your day. I however, did not do that, i wondered _why_ and _how_.
Is this a actual rule i can use in day to day life? what are it's limitations?

So i whipped out a pen and paper and tried to figure out the mechanics here and
if there was a sorta mathematical proof.

> I will note however that on one occasion my dad excitedly showed me a math hack
> and when i then got some paper and began to come up with a proof a lot of his
> excitement died so note that i am killing the magic here somewhat.

# The 55 trick

To start lets quickly confirm this works for all 9 possibilites:

| Equation    | $5 \times n$ | digit addition | result |
| ----------- | ------------ | -------------- | ------ |
| $55\times1$ | 5            | 5              | 55     |
| $55\times2$ | 10           | 1              | 110    |
| $55\times3$ | 15           | 6              | 165    |
| $55\times4$ | 20           | 2              | 220    |
| $55\times5$ | 25           | 7              | 275    |
| $55\times6$ | 30           | 3              | 330    |
| $55\times7$ | 35           | 8              | 385    |
| $55\times8$ | 40           | 4              | 440    |
| $55\times9$ | 45           | 9              | 495    |

We had to take some liberties with $55\times1$ since there is no "middle" to
stick 5 into but it does seem to work. Formally it seems that if we have
$5n = 10a + b$, then:

$$
\begin{aligned}
55 \times n = 100a + 10(a+b) + b
\end{aligned}
$$

Now we can sub in $n = {10a+b\over{5}}$ to the $LHS$ and pretty quickly prove that
the equation holds for all real values of $a$ and $b$.

$$
\begin{aligned}
&55({10a+b\over{5}})\\\
&=11(10a+b)\\\
&=110a+11b\\\
&=100a+10(a+b)+b\\\
\end{aligned}
$$

Which was...suprising to me. If this is correct then this should work for bigger
$n$ as well? What about $55\times45$? Well if $n=45$ then:

$$
\begin{aligned}
&5n=225=10(22)+5\\\
&a=22,b=5\\\
&55\times45=100(22) + 10(27) + 5\\\
&=2200 + 270 + 5\\\
&=2475
\end{aligned}
$$

Huh. The above notation kinda gives away the underlying reason this works. This,
and frankly a lot of math hacks, boil down into the fact that we work with a
decimal system and we can _very_ easily break numbers down into 100s and 10s and
1s and recombine them. Showing someone the formula

$55 \times n = 100a + 10(a+b) + b$ where $5n=10a+b$

Is unlikely to make anyone go "woah! how easy!" but $5n$ is a easy computation
and finding $a$ and $b$ are trivial for 2 digit numbers, you just take the
first and second digit as $a$ and $b$. You can explain $100a + 10(a+b) + b$ very
easily as taking $a$ and $b$, adding them and sticking it in the
middle of thw two. Visually it seems like we are just moving numbers around but
when we put 3 single digits next to each other as $123$ we are actually just
very quickly computing $100*1+10*2+3$. This is the exact same reasoning.

All we've really done here is broken $55n$ down into a form where we can
repesent it in terms of 100s, 10s and 1s and if you lean into this idea you
can imagine how we could have arrived at it ourselves:

$$
\begin{aligned}
&55n = (50+5)n\\\
&=50n+5n\\\
&=5n(10) + 5n\\\
\end{aligned}
$$

Hrm but 5n could be multiple digits which is hard, lets break it down into
it's consitute digits:

$$
\begin{aligned}
&=(10a+b)(10) + (10a+b)\\\
&=(100a+10b) + (10a+b)\\\
&=100a + 10(a+b) + b \\\
\end{aligned}
$$

And we're at our formula again!

# Generalising

You may have noticed that the $55$ doesn't seem to be incredibly special.
What's nice is that you can break 55 down into $5(10+1)$ but wait, this is true
of all multiples of $11$. $11$ in fact is a very magic number and you'll see
it in a couple of different math hacks, each for the same reason.

$$
11m = m(10+1)
$$

In fact lets generalise our equation from above.

$11m \times n = 100a + 10(a+b) + b$ where $mn=10a+b$

But try $88 \times 6$ and you'll see why this pinterest post did not use 88.

$$
\begin{aligned}
&88 \times 6 = 48\\\
&4+8=12\\\
&4, 12, 8\\\
&4128\\\\
\end{aligned}
$$

The moment your "middle" value is more then 1 digit it breaks! You can't
just stick it in between $4$ and $8$. If you think back to the underlying math
here you can quickly see why. You aren't saying "stick 12 in the middle" you
are actually saying "the result has 4 hundreds, 12 tens and 8 ones". Thinking
about it this way you can quickly adjust the hack to up the number of hundreds
by 1 and you get to $528$.

I find this view of the hack to actually be a lot better then the approach a lot
of videos take where they just show you moving numbers around, a slightly deeper
understanding means you can use these hacks in more situations without getting
confused.

# The fingers trick

This one is a trick for your 9 times tables. It was lovingly explained to
me as so:

> 4x9? Simply spread all your fingers out, then put the 4th one down. What do
> you have left on either side of the one that's down? 3 on the left and 6 on
> the right. 36

Why does it work?

...WIP