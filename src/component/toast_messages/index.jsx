import React, { useEffect, useState } from "react";
import styles from "./toastMessages.module.css";

function ToastMessages(props) {
  const [isClickButton, setIsClickButton] = useState(false);
  const [count, setCount] = useState(0);

  const handleShowToastMSG = () => {
    setIsClickButton(true);
    setCount(count + 1);
  };

  const handleCloseToastMSG = (e, idOfDivCloseBtn) => {
    const elementTagName = e.target.tagName;
    if (elementTagName.toString().toLowerCase() === "div") {
      console.log(e.target.id);
    }
    if (elementTagName.toString().toLowerCase() === "i") {
      e.target.parentElement.parentElement.classList.add(styles.toastClose);
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        () => {
          e.target.parentElement.parentElement.remove();
        }
      );
    }

    if (
      elementTagName.toString().toLowerCase() === "div" &&
      e.target.id.toString() === idOfDivCloseBtn
    ) {
      e.target.parentElement.classList.add(styles.toastClose);
      e.target.parentElement.addEventListener("animationend", () => {
        e.target.parentElement.remove();
      });
    }
  };

  useEffect(() => {
    if (isClickButton) {
      let timeCount = 1;
      let intervalID;
      const toastMsg = document.getElementById("toastMsg");
      if (toastMsg) {
        const toastCore = document.createElement("div");
        if (toastCore) {
          toastCore.classList.add(styles.toast);
          let icon;
          if (props.status === "success") {
            icon = `<i class="fa-solid fa-circle-check" style= "color: #fff; width: 20px; height: 20px"></i>`;
            toastCore.style.backgroundColor = "#71be34";
          }
          if (props.status === "error") {
            icon = `<i class="fa-solid fa-circle-exclamation" style= "color: #fff; width: 20px; height: 20px"></i>`;
            toastCore.style.backgroundColor = "#ff623d";
          }
          if (props.status === "infor") {
            icon = `<i class="fa-solid fa-circle-info" style= "color: #fff; width: 20px; height: 20px"></i>`;
            toastCore.style.backgroundColor = "#3498db";
          }
          toastCore.innerHTML = `<div class=${styles.leftContentOfToast}>
            <div>
              ${icon}
            </div>
            <div class=${styles.toast__body}>
              <h3>${props.title}</h3>
              <p>${props.content}</p>
            </div>
          </div>
          <div class=${styles.toast__closeBtn} id="toast__closeBtn${count}">
            <i
              class="fa-solid fa-xmark fa-lg"
              style=" color: #fff"
            ></i>
          </div>`;

          toastCore.addEventListener("click", (e) =>
            handleCloseToastMSG(e, `toast__closeBtn${count}`)
          );

          intervalID = setInterval(() => {
            if (timeCount === props.autoClose) {
              console.log("OK");
              console.log(timeCount);
              toastCore.classList.add(styles.toastClose);
              toastCore.addEventListener("animationend", () => {
                toastCore.remove();
              });
              clearInterval(intervalID);
            } else {
              console.log(timeCount);
              timeCount = timeCount + 1;
            }
          }, 1000);

          toastCore.addEventListener("mouseenter", () => {
            clearInterval(intervalID);
          });

          toastCore.addEventListener("mouseleave", () => {
            intervalID = setInterval(() => {
              if (timeCount === props.autoClose) {
                console.log("OK");
                console.log(timeCount);
                toastCore.classList.add(styles.toastClose);
                toastCore.addEventListener("animationend", () => {
                  toastCore.remove();
                });
                clearInterval(intervalID);
              } else {
                console.log(timeCount);
                timeCount = timeCount + 1;
              }
            }, 1000);
          });

          if (toastCore && toastMsg) {
            toastMsg.appendChild(toastCore);
          }
        }
      }
      setIsClickButton(false);
    }
  }, [isClickButton]);

  return (
    <div>
      <button onClick={handleShowToastMSG}>Custom toast {props.status}</button>
      <div className={styles.test} id="toastMsg"></div>
    </div>
  );
}

export default ToastMessages;
