"use client"
import Diagnosis from "@/Components/Diagnosis";
import SideBar from "@/Components/SideBar";
import { useEffect, useRef, useState } from "react";

export default function Report() {
    return (
        <div className="flex flex-row items-start justify-center h-[93vh] w-full">
            <SideBar/>
            <Diagnosis/>
        </div>
    )
}