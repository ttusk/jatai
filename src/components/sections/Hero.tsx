import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/Terminal";
import { ArrowUpRight } from "lucide-react";
import { siGithub } from "simple-icons";
import { SimpleIcon } from "@/components/SimpleIcon";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const asciiArt = String.raw`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠰⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠈⡄⠀⠀⠀⡔⠂⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠂⠀⠀⠐⠈⠀⠀⠄⠀⠀⠠⠴⠤⣴⣆⠴⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠐⠀⠀⠀⠀⠀⠀⢑⠖⢀⡀⠀⠀⠀⠀⠀⠉⠑⠋⠁⠲⢶⣶⠂⠰⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠦⣀⢀⣁⣀⣤⡴⡿⣋⡴⣄⡠⠰⠖⡤⣄⣠⢀⡀⠀⡀⣠⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⡤⠄⠀⠀⠀⢀⠀⡀⠀⠀⠀⠈⠁⠀⠀⣀⣘⢀⣶⣶⢿⣛⠛⠋⠋⣉⠒⣂⠔⣭⢥⡙⠒⠀⡝⡷⢊⢋⠀⠌⡰⠓⣺⣻⡅⠀⡘⠉⠀⠄⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠦⠌⠃⠀⠀⣄⠀⠀⠘⣟⠀⡂⠀⠈⣠⡤⡶⠛⢫⠜⢋⠀⠂⠦⠑⢀⢠⢨⠖⣠⣩⠦⡹⢴⢚⣂⡄⢉⠩⠐⠀⠐⠠⢁⠀⠀⠀⠀⠠⠜⠀⠀⣀⣰⠤⣐⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⢀⡀⠁⣰⡀⠉⢿⠆⢀⣀⡠⣿⠝⣲⢛⠴⡲⣿⣷⣽⣼⡴⢦⣦⣤⣶⡴⣭⢏⡭⣐⢬⠰⢣⠬⣍⢣⠽⣙⣈⠀⠀⠄⠀⠀⢠⠀⠤⠁⠀⠀⡀⠀⠈⠘⠠⠀⢀⡀⠠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠐⠦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⢀⣂⡨⠅⡤⡘⠄⠋⢐⠈⡐⣿⣿⣆⢠⠣⠌⣹⠶⢧⣻⢿⣿⠿⠬⡽⣿⣟⢿⣿⣯⣞⣶⣜⣀⡑⡫⢶⠌⠣⠎⠱⡌⢆⢃⠆⠁⠠⢃⡈⠠⢀⠈⠒⠠⠄⠒⠀⠀⠀⠀⠀⠀⠉⠒⠉⠐⢍⠤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠈⠁⠀⠀⢘⡘⠖⢾⣤⣼⡳⠈⠁⠀⢘⠻⢿⣷⠋⡐⠃⠀⣨⣅⢌⡓⣦⣩⢍⣶⣬⣽⣴⣿⣿⠿⢯⢷⢂⣁⡉⠐⠢⣒⣄⠘⠔⠪⢌⡘⠐⢢⠀⠄⢃⠢⠘⡀⠂⠄⠂⠄⠀⠀⠠⠀⠀⠀⠀⠀⠈⠀⠂⠁⠐⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⡀⠀⠀⠀⡄⢐⡐⢆⣔⡻⢿⣫⣌⠈⡁⠡⣹⣷⢨⡀⣶⣄⠀⣿⠿⡐⣷⣷⣿⣿⣿⡿⢛⣩⣶⣶⣿⣿⣿⣷⣶⣾⣽⣓⡢⠌⠁⠈⡀⢄⠈⢁⠂⠅⡊⠄⡁⠆⢡⢉⠠⠡⠌⡀⠒⡀⡀⠀⢀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠑⠂⠄⠀⢀⣐⠾⠇⣙⣦⠹⣿⣿⠇⡀⣴⣿⢻⠁⢥⠀⢛⣚⠀⣧⡙⣽⣿⣿⣟⡟⣼⣿⣿⣿⡿⣹⣿⣿⣿⣽⣿⣻⣿⣿⣶⣆⡠⠀⠉⠓⣤⡔⠄⡀⠐⠀⠀⠂⠤⢁⠂⡐⢀⠂⠄⠀⠀⠀⠈⠈⠛⠰⠤⠀⠀⠀⠐⠀⠀⣡⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠘⠌⢨⢴⣮⡛⣧⣍⠖⣽⣾⣿⣷⢉⡣⢈⡈⢘⠻⣠⠁⣧⢻⣿⣿⣻⣃⣿⣿⣿⣰⣿⡿⢟⣛⣛⣻⠻⣿⣿⣿⣽⣿⣿⣟⣦⣐⠶⢴⣻⡴⠆⡀⠧⢉⠆⠠⠁⠄⢂⠐⠈⠠⠀⠀⠂⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠁⡀⠣⠱⣙⣌⢿⡆⣙⠾⣶⡽⣷⡹⡆⡨⣌⠳⣽⣟⢬⡂⢻⣿⣿⣘⣿⣿⣧⣾⣿⣰⣿⣿⣿⣿⣿⣷⣶⣮⡻⣿⣿⣿⣿⣿⣶⣦⣬⢶⡌⣅⣐⠃⢂⠤⢁⠌⠠⠈⠀⠐⠀⡁⠄⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠐⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡄⡀⠀⠀⠀⢠⡀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠣⠩⣭⣎⡻⣿⣾⣄⢽⣿⣷⣁⠀⡨⣝⠞⣿⡟⢻⣿⣿⣿⣿⡘⣿⣿⣿⢱⣿⣿⣿⣿⣭⣽⣻⢿⣿⣿⣶⣉⢻⣿⣛⢿⣿⣿⣷⣦⣬⡉⢙⠲⡀⠁⠠⠀⠀⠀⠀⠀⠄⠀⠂⢀⠠⠀⠀⠀⠁⠀⠠⠄⡀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠁⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠈⠳⠤⢽⣻⣮⢿⣻⢦⡑⢾⣿⣦⠙⠲⣶⣽⣿⣏⣿⣿⣾⣿⣿⡘⣿⣿⣜⣿⣿⠛⠛⠛⠛⠿⣷⣟⢻⣿⣿⣿⣾⣝⣻⣿⣻⣿⣿⣿⣟⢦⣉⠘⠝⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡄⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠂⡈⠀⠀⠓⠒⠒⢿⣯⠭⡳⠍⠀⠘⢻⣗⡂⠛⢿⣿⣿⡿⣿⣿⠾⣿⣿⣶⡙⣿⣿⡟⠀⠀⠀⠀⠀⠀⠈⠹⣿⣿⣿⣿⣿⣿⣷⣶⡹⢿⣿⣿⣷⣜⠷⣀⠙⢷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠰⠀⢉⠈⡾⣀⣈⠹⢷⣆⠈⠀⢿⣿⣿⡀⠀⡉⢏⣿⣎⢿⣿⣶⣛⣿⣿⣶⣬⣝⡢⠀⠀⠀⠀⠀⠀⠀⠸⣿⣷⣦⣙⢿⣿⣟⣿⣿⣽⢻⣿⣿⣷⠉⣷⡀⠆⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠂⠨⠙⠶⡩⣕⠦⢄⠰⣎⠀⠀⡉⠛⢿⣷⡄⢴⣌⣻⣷⣝⠿⣿⣶⣽⢻⣿⣿⣿⣷⣦⣄⣀⠀⠀⠀⣸⣿⣿⣿⣿⡜⢿⣿⣿⣿⣿⡹⣿⣿⣿⣷⡄⠐⣄⠙⠆⣢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠴⠀⠀⠀⠀⠀⠂⠁⠀⠂⢀⠀⠄⠘⠲⢷⣇⠓⠠⢂⠻⡔⠦⠀⠙⢿⣷⣠⣙⠿⣿⣿⣿⣛⢿⢿⣿⣿⣾⣿⣾⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣷⢹⣿⣿⣿⣿⣖⣿⣿⣻⣿⣧⠛⠤⠡⡈⠻⣿⣷⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⡀⠀⠂⠀⡀⠀⠀⠀⠀⠀⠀⠂⠄⠠⠀⠹⡟⢞⢮⡀⢁⡀⢛⡰⢌⠋⠽⣿⣷⣝⣿⣿⣿⣿⣷⣶⣭⣙⣛⣛⣛⣫⣶⣾⣿⣿⣿⡇⣿⣿⣽⣷⢹⣿⡿⣿⡟⢻⣿⣿⣿⣿⠟⣨⠇⠁⠀⠈⢹⣷⣀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢨⣁⠀⡀⠀⠁⠀⠀⠀⠀⠁⡀⠘⠂⠄⠽⠢⣒⣣⢉⢎⡂⠑⣀⡐⢿⠳⣾⣭⣛⣿⠿⣿⣿⣿⣿⣿⣿⣿⡿⢛⣛⣭⣾⣿⣿⣻⣿⢺⣿⡧⣿⣿⡾⣿⣾⣿⣿⣧⡹⡅⢓⠀⡀⠈⠿⢿⣆⡀⠀⠀⠤⢠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠀⡉⠂⣀⠀⠠⠀⠠⠀⠀⠀⠀⠀⠈⠠⡁⠔⢚⠩⠂⢀⠆⡁⠦⡙⠆⢢⣙⠷⣿⣿⣿⣶⣝⡻⢿⣷⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⡿⣸⣿⡧⣿⣿⣧⣿⣿⣼⣿⣝⣅⡈⠦⠁⠀⠐⠩⣌⣿⣷⠀⠀⠄⠁⡈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠃⠠⡄⢀⠀⠀⠀⠀⠀⠡⡐⠂⠈⠐⡈⠄⠂⡉⢖⡩⢓⡢⡑⢦⠈⠹⣿⣿⣛⣿⣷⣴⣬⣭⣭⣙⣛⣛⣛⣛⣹⣭⣴⣾⣿⢏⣾⣿⣿⣽⣿⣿⣿⡆⢍⢧⠳⣈⠐⠀⠀⠘⣿⡻⢵⡐⡤⠒⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠙⠈⠀⠄⠀⠀⡀⠐⠀⠄⠀⠁⠀⠐⠂⠬⢐⡓⣂⣃⠐⢢⠄⣢⢉⠒⠾⠿⢽⣭⣭⣿⣿⣿⣿⣿⣿⢿⣿⣟⣻⢟⣛⣼⣿⣿⣿⢿⣿⣿⡋⠝⡘⡇⠀⠹⠀⣐⢂⠀⠸⣯⠐⡟⢔⢦⡀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⣐⢢⡒⠀⠀⡀⠉⢐⡂⠀⡄⠈⠀⠀⠀⠀⠀⡁⡈⢀⠡⠀⠦⠍⢦⢚⡴⢏⢶⡲⠦⣉⡉⠩⠯⣝⣭⡮⠕⠻⡿⠿⠿⣿⣿⣿⣿⡻⢛⣵⡿⠍⢊⡼⠓⠁⠡⠀⠐⢠⠀⠈⠀⢴⣟⡳⠈⠀⠘⢺⣃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠈⠀⠀⠈⢚⠰⠄⠀⢀⠀⠀⠀⠀⠀⠐⠀⡈⠀⠈⡉⢊⡉⢏⡝⣂⡥⡍⡝⡺⡊⢈⣣⠾⣫⡘⢳⣌⣁⣬⡌⡩⠤⠐⣈⠬⢕⡾⠁⠀⠀⠃⠀⠈⠍⠐⡒⠀⠀⢹⣶⡅⢿⢢⠢⠠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠐⢶⠖⡂⡉⠤⣴⡏⠀⠀⡀⠀⠀⠀⡀⠀⠀⠈⡉⣓⡻⣷⢿⣬⣡⡶⡴⣒⣘⠒⢶⣾⣿⠌⠛⣩⣅⢁⡐⡛⠉⠞⠁⠀⢀⡀⡴⠄⠀⠈⠀⠒⢄⡙⢽⣿⣿⡣⣤⡔⢆⡀⠀⡠⠀⠀⠀⡈⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠩⠉⠐⢫⡐⠿⣶⢓⣨⣄⢀⠡⡄⣂⠠⠠⡠⢹⠦⣒⢆⡶⣢⠍⡻⠓⡊⡠⠀⡡⠹⣄⠀⡀⢀⡄⠀⠂⠀⠂⠠⢀⡠⠐⠃⡠⢒⠀⠪⣜⣻⡟⠿⣿⡇⠑⡎⠐⠈⢁⠀⠀⠀⠀⠀⢐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠈⠐⠙⣩⢏⣭⣶⢿⣦⡳⣔⣾⢏⣀⢚⡋⢀⠴⠖⣂⣅⢄⠎⣀⡠⣌⢉⠠⡤⣤⢀⢂⣄⢧⠐⢊⡁⡠⣤⣄⠂⠉⣀⣶⡇⢐⠬⡙⠂⠀⡐⡁⠀⠂⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠃⠉⠠⠁⠻⠣⢙⡃⢾⢿⣿⣿⣿⣿⡿⠟⠋⠩⠄⢤⠂⠩⠘⠓⠈⠐⠁⠘⢏⠁⠀⠀⢠⠐⠦⣩⠴⠁⢾⠏⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠈⠙⠀⠄⠀⠀⠀⠀⠄⠒⠫⠙⠃⠤⠠⠄⠁⠠⠁⠀⠀⠜⠈⠀⠈⠈⠻⠉⠀⠀⠘⠀⠠⠀⠀⠠⠈⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠆⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠲⠀⠂⠀⠁⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ `;

const terminalSteps = [
  {
    prompt: "$",
    command: "npm install @jatai/sdk",
    output: ["added 1 package in 1.2s"],
    narration: [
      "# Jataí é um projeto open source de open finance.",
      "# Facilitamos a sua integração bancária com o Sputnik.",
      "# Veja como é simples:",
    ],
  },
  {
    prompt: "$",
    command: "npx jatai init --env production",
    output: [
      "✓ Open Finance provider configured",
      "✓ Client credentials validated",
      "✓ Consent flow ready",
    ],
    narration: ["# Configure o Sputnik em segundos."],
  },
  {
    prompt: ">",
    command: "jatai.openFinance.accounts({ cpf: '123.456.789-00' })",
    output: [
      "{",
      "  institution: 'Banco do Brasil',",
      "  accounts: [",
      "    { type: 'checking', balance: 4850.00, currency: 'BRL' },",
      "    { type: 'savings', balance: 12300.00, currency: 'BRL' }",
      "  ]",
      "}",
    ],
    outputLang: "json" as const,
    narration: ["# Consulte contas em uma única chamada."],
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.to(asciiRef.current, { opacity: 0, duration: 0.25 }, 0);

      let cursor = 0;

      terminalSteps.forEach((step, stepIndex) => {
        const stepEl = terminalRef.current?.querySelector(
          `[data-step="${stepIndex}"]`
        );
        const promptEl = stepEl?.querySelector(".prompt-text") as HTMLElement | null;
        const commandEl = stepEl?.querySelector(".command-text") as HTMLElement | null;
        const outputEls = stepEl?.querySelectorAll(".output-line");
        const narrationEls = stepEl?.querySelectorAll(".narration-line");
        const fullText = commandEl?.dataset.fullText || "";

        narrationEls?.forEach((line, lineIndex) => {
          tl.set(line, { visibility: "visible" }, cursor + lineIndex * 0.12);
          tl.fromTo(
            line,
            { opacity: 0, y: -4 },
            { opacity: 1, y: 0, duration: 0.15 },
            cursor + lineIndex * 0.12
          );
        });

        cursor += (narrationEls?.length || 0) * 0.12 + 0.3;

        const revealCursor = cursor + 0.01;
        tl.to(promptEl, { opacity: 1, duration: 0.02 }, revealCursor);
        tl.to(commandEl, { opacity: 1, duration: 0.02 }, revealCursor);

        const typeProxy = { value: 0 };
        tl.to(
          typeProxy,
          {
            value: fullText.length,
            duration: fullText.length * 0.03,
            ease: "none",
            onUpdate: () => {
              if (commandEl) {
                commandEl.textContent = fullText.slice(
                  0,
                  Math.round(typeProxy.value)
                );
              }
            },
          },
          revealCursor
        );

        cursor += fullText.length * 0.03 + 0.2;

        outputEls?.forEach((line, lineIndex) => {
          tl.set(line, { visibility: "visible" }, cursor + lineIndex * 0.05);
          tl.fromTo(
            line,
            { opacity: 0, x: -6 },
            { opacity: 1, x: 0, duration: 0.1 },
            cursor + lineIndex * 0.05
          );
        });

        cursor += (outputEls?.length || 0) * 0.05 + 0.4;
      });

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-background" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen px-6">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="mx-auto grid h-full max-w-7xl items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center gap-5">
            <h1
              className="decay-in text-5xl font-display font-bold tracking-tight text-primary drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] sm:text-6xl md:text-7xl"
              style={{
                "--decay-x": "-10px",
                "--decay-y": "-20px",
                "--decay-rotate": "-2deg",
                "--decay-delay": "0.15s",
              } as React.CSSProperties}
            >
              Jataí
            </h1>

            <p
              className="decay-in max-w-md text-base font-medium text-foreground sm:text-lg md:text-xl"
              style={{
                "--decay-x": "8px",
                "--decay-y": "-14px",
                "--decay-rotate": "1deg",
                "--decay-delay": "0.3s",
              } as React.CSSProperties}
            >
              OpenFinance de uma forma nunca antes vista.
            </p>

            <div
              className="decay-in flex flex-wrap gap-4 pt-4"
              style={{
                "--decay-x": "-6px",
                "--decay-y": "16px",
                "--decay-rotate": "-1.5deg",
                "--decay-delay": "0.45s",
              } as React.CSSProperties}
            >
              <Button size="lg" className="gap-2">
                Conheça as soluções
                <ArrowUpRight className="size-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <SimpleIcon icon={siGithub} className="size-4" />
                Ver no GitHub
              </Button>
            </div>
          </div>

          <div
            className="decay-in relative flex flex-col justify-center"
            style={{
              "--decay-x": "24px",
              "--decay-y": "12px",
              "--decay-rotate": "1.5deg",
              "--decay-delay": "0.55s",
            } as React.CSSProperties}
          >
            <div
              ref={asciiRef}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3"
            >
              <pre className="font-mono text-[0.5rem] leading-[1.1] text-primary opacity-100 sm:text-xs">
                {asciiArt}
              </pre>
            </div>
            <Terminal ref={terminalRef} steps={terminalSteps} />
          </div>
        </div>
      </div>
    </section>
  );
}
