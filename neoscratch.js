// NeoScratch Project Advertisement Script by ZXMushroom63
var studioIds = ["14640", "280375", "279942", "209938", "33568230", "33823677", "33149788", "33289675", "33682189", "33224665", "15471207", "218753", "216975", "216346", "33805227", "33286134", "33697591"]; //Target studios to repost on
var projectIds = []; //Target projects to repost
var frequency = 20; //Seconds per repost.
var randomDelay = 5; //Random offset (seconds)
var neoClearConsole = true; //Should we clear the console per every iteration?

console.log("[Script] Run NeoScratch() in the console to start.");
function NeoScratch() {
    var neoVersion = "v0.2"
    var token = null;

    console.log("[NeoScratch] Welcome to NeoScratch " + neoVersion);
    console.log("[NeoScratch] Made by ZXMushroom63");
    console.log("[NeoScratch] Is User Logged In? " + (getCSRFToken() ? "Yes" : "No"));
    if (!getCSRFToken()) {
        console.log("[NeoScratch] NeoScratch requires you to be logged in! Sorry!");
        return;
    }
    console.log("[NeoScratch] Is User On Public Studio? " + (location.pathname.startsWith("/studios") ? "Yes" : "No"));
    if (!location.pathname.startsWith("/studios")) {
        console.log("[NeoScratch] NeoScratch requires you to be on a studio page. Try any studio that allows you to publicly add projects. Here is an example: https://scratch.mit.edu/studios/280375/");
        return;
    }
    console.log("[NeoScratch] Is User On Scratch? " + (location.pathname.startsWith("/studios") ? "Yes" : "No"));
    if (!location.host.endsWith("scratch.mit.edu")) {
        //Bruh.
        return;
    }
    console.log("[NeoScratch] Note: Only works with *your* projects.");
    console.log("[NeoScratch] Now set the projectIds variable by running some JavaScript in the console:");
    console.log("[NeoScratch] Eg: var projectIds = [\"your_project_id_here\", \"and_another_project_id\"];");

    async function removeProject(studioId, projectId) {
        if (!token) {
            return;
        }
        await fetch(`https://api.scratch.mit.edu/studios/${studioId}/project/${projectId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CSRFToken": getCSRFToken(),
                "X-Token": token,
            },
        });
    }

    async function repostProject(studioId, projectId) {
        if (!token) {
            return;
        }
        await fetch(`https://api.scratch.mit.edu/studios/${studioId}/project/${projectId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CSRFToken": getCSRFToken(),
                "X-Token": token,
            },
        });
    }

    function getCSRFToken() {
        const tokens = /scratchcsrftoken=([\w]+)/.exec(document.cookie);
        return tokens[1];
    }

    var trueSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

    XMLHttpRequest.prototype.setRequestHeader = function (...args) {
        if (args[0] === "X-Token") {
            if (!token) {
                console.log("[NeoScratch] Got X-Token! Will begin reposting...");
            }
            token = args[1];
        }
        trueSetRequestHeader.call(this, ...args);
    }
    var i = 0;
    function getStudioIndexFromIteration() {
        return Math.floor(i / projectIds.length) % studioIds.length;
    }
    function getProjectIndexFromIteration() {
        return i % projectIds.length;
    }
    async function neoLoop() {
        if (!token) {
            setTimeout(neoLoop, 1000);
            return;
        }
        await removeProject(studioIds[getStudioIndexFromIteration()], projectIds[getProjectIndexFromIteration()]);
        await repostProject(studioIds[getStudioIndexFromIteration()], projectIds[getProjectIndexFromIteration()]);
        if (neoClearConsole) {
            console.clear();
        }
        console.log("[NeoScratch] Repost Iteration #" + i);
        console.log(`[NeoScratchDEBUG] (Studio: ${studioIds[getStudioIndexFromIteration()]}) (Project: ${projectIds[getProjectIndexFromIteration()]})`);
        i++;
        if (i > Number.MAX_SAFE_INTEGER - (studioIds.length * projectIds.length)) {
            i = 0;
        }
        setTimeout(neoLoop, Math.max((frequency * 1000) + Math.round(Math.random() * randomDelay), 500));
    }
    function neoCheck() {
        if (projectIds.length > 0) {
            console.log("[NeoScratch] Perfect! Now simply add a project to the studio and NeoScratch will begin!");
            neoLoop();
            return;
        } else {
            setTimeout(neoCheck, 1000);
        }
    }
    neoCheck();
}
