document.addEventListener('DOMContentLoaded', () => {
    const selectUser = document.getElementById('userName');
    const userMessage = document.getElementById('userMessage1'); // pタグを取得
    const nextOptions = document.getElementById('nextOptions');
    const timeInputsContainer = document.getElementById('timeInputsContainer'); // 時間入力フィールドのコンテナ

    // ユーザーの選択肢
    const users = [
        { value: "1", text: "ユーザー 1" },
        { value: "2", text: "ユーザー 2" },
        { value: "3", text: "ユーザー 3" }
    ];

    // 回数選択肢
    const count = Array.from({ length: 24 }, (_, i) => ({
        value: (i + 1).toString(),
        text: `${i + 1}回`
    }));

    // ユーザー選択肢の生成
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.value;
        option.textContent = user.text;
        selectUser.appendChild(option);
    });

    // 回数選択肢の生成
    count.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.textContent = item.text;
        nextOptions.appendChild(option);
    });

    // ユーザー選択肢のイベントリスナー
    selectUser.addEventListener('change', function() {
        const selectedValue = selectUser.value;
        const selectedText = selectUser.options[selectUser.selectedIndex].text;

        userMessage.textContent = `(2) ${selectedText}さんの位置情報を一日に何回通知しますか？`; // pタグの中身を更新

        // 次の選択肢を有効にする
        nextOptions.disabled = !selectedValue; // 有効/無効を切り替える
    });

    // 回数選択肢の変更イベントリスナー
    nextOptions.addEventListener('change', function() {
        const selectedCount = parseInt(nextOptions.value, 10);
        
        // コンテナ内の既存の時間入力フィールドをクリア
        timeInputsContainer.querySelectorAll('input[type="time"]').forEach(input => input.remove());

        // 選択した回数分の時間入力フィールドを生成
        for (let i = 0; i < selectedCount; i++) {
            const timeLabel = document.createElement('label');
            timeLabel.textContent = `時間 ${i + 1}:`;
            const timeInput = document.createElement('input');
            timeInput.type = 'time';
            timeInput.className = 'form-control';

            // 30分ごとの制限を適用
            timeInput.addEventListener('change', function() {
                const selectedTime = timeInput.value;
                if (selectedTime) {
                    const [hour, minute] = selectedTime.split(':').map(Number);
                    if (minute % 30 !== 0) {
                        alert('30分ごとに設定してください。');
                        timeInput.value = ''; // 値をリセット
                    }
                }
            });

            timeInputsContainer.appendChild(timeLabel);
            timeInputsContainer.appendChild(timeInput);
        }
    });
});
