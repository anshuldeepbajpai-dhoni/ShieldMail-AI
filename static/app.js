document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("spamForm");
    const emailInput = document.getElementById("emailInput");

    const analyzeBtn = document.getElementById("analyzeBtn");
    const buttonText = document.getElementById("buttonText");
    const buttonLoader = document.getElementById("buttonLoader");

    const sampleBtn = document.getElementById("sampleBtn");
    const newAnalysisBtn = document.getElementById("newAnalysisBtn");

    const charCount = document.getElementById("charCount");

    const resultCard = document.getElementById("resultCard");

    const resultIcon = document.getElementById("resultIcon");
    const resultTitle = document.getElementById("resultTitle");
    const resultDescription = document.getElementById("resultDescription");

    const riskScore = document.getElementById("riskScore");
    const riskProgress = document.getElementById("riskProgress");

    const statCharacters = document.getElementById("statCharacters");
    const statWords = document.getElementById("statWords");
    const statUrls = document.getElementById("statUrls");
    const statEmails = document.getElementById("statEmails");
    const statDigits = document.getElementById("statDigits");
    const statExclamations = document.getElementById("statExclamations");

    const messagePreview = document.getElementById("messagePreview");


    /* =========================================
       CHARACTER COUNTER
       ========================================= */

    emailInput.addEventListener("input", () => {

        charCount.textContent = emailInput.value.length;

    });


    /* =========================================
       SAMPLE MESSAGE
       ========================================= */

    sampleBtn.addEventListener("click", () => {

        const sampleMessage =
            "Congratulations! You have won a $1,000 cash prize. " +
            "Click http://example.com now to claim your reward. " +
            "Limited time offer!!!";

        emailInput.value = sampleMessage;

        charCount.textContent = sampleMessage.length;

        emailInput.focus();

    });


    /* =========================================
       FORM SUBMISSION
       ========================================= */

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const message = emailInput.value.trim();

        if (!message) {

            alert("Please enter a message to analyze.");

            emailInput.focus();

            return;
        }


        setLoading(true);


        try {

            const response = await fetch("/predict", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body:
                    new URLSearchParams({
                        email: message
                    })

            });


            const data = await response.json();


            if (!response.ok || data.error) {

                throw new Error(
                    data.error ||
                    "Unable to analyze the message."
                );

            }


            displayResult(data);


        } catch (error) {

            console.error(error);

            alert(
                error.message ||
                "Something went wrong while analyzing the message."
            );

        } finally {

            setLoading(false);

        }

    });


    /* =========================================
       DISPLAY RESULT
       ========================================= */

    function displayResult(data) {

        const isSpam =
            data.is_spam === true ||
            data.prediction === "SPAM";


        const score =
            Number(data.spam_score ?? 0);


        const stats =
            data.stats || {};


        /* Result heading */

        if (isSpam) {

            resultIcon.textContent = "🚨";

            resultIcon.style.background =
                "#fef2f2";

            resultTitle.textContent =
                "Spam Detected";

            resultTitle.style.color =
                "#dc2626";

            resultDescription.textContent =
                "This message shows characteristics commonly associated with spam.";

        } else {

            resultIcon.textContent = "🛡️";

            resultIcon.style.background =
                "#ecfdf5";

            resultTitle.textContent =
                "Looks Safe";

            resultTitle.style.color =
                "#059669";

            resultDescription.textContent =
                "The model classified this message as legitimate.";

        }


        /* Risk score */

        const safeScore =
            Math.min(
                100,
                Math.max(0, score)
            );


        riskScore.textContent =
            `${safeScore.toFixed(1)}%`;

        riskProgress.style.width =
            `${safeScore}%`;


        if (safeScore >= 70) {

            riskProgress.style.background =
                "#dc2626";

        } else if (safeScore >= 40) {

            riskProgress.style.background =
                "#f59e0b";

        } else {

            riskProgress.style.background =
                "#059669";

        }


        /* Statistics */

        statCharacters.textContent =
            stats.characters ?? 0;

        statWords.textContent =
            stats.words ?? 0;

        statUrls.textContent =
            stats.urls ?? 0;

        statEmails.textContent =
            stats.emails ?? 0;

        statDigits.textContent =
            stats.digits ?? 0;

        statExclamations.textContent =
            stats.exclamations ?? 0;


        /* Message */

        messagePreview.textContent =
            data.message || emailInput.value;


        /* Show result */

        resultCard.classList.remove("hidden");


        setTimeout(() => {

            resultCard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }


    /* =========================================
       LOADING STATE
       ========================================= */

    function setLoading(isLoading) {

        analyzeBtn.disabled =
            isLoading;

        sampleBtn.disabled =
            isLoading;


        if (isLoading) {

            buttonText.textContent =
                "Analyzing...";

            buttonLoader.classList.remove(
                "hidden"
            );

        } else {

            buttonText.textContent =
                "Analyze Message";

            buttonLoader.classList.add(
                "hidden"
            );

        }

    }


    /* =========================================
       NEW ANALYSIS
       ========================================= */

    newAnalysisBtn.addEventListener(
        "click",
        () => {

            resultCard.classList.add(
                "hidden"
            );

            emailInput.value = "";

            charCount.textContent = "0";

            emailInput.focus();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

});

